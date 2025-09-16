const { pdfservices } = require("./pdfgenerate.services");

const pdfdata=require("../data/pdfdata")
const pdfgenerater=require('../utils/pdfgenerater');
const { stack } = require("./pdfgenerate.router");
const fs = require('fs');
const path = require('path');
const { htmlToText } = require('html-to-text');
const puppeteer = require('puppeteer');
const PDFDocument=require('pdfkit')


module.exports={
    pdfdownload:async(req,res)=>{
    try {
        console.log(pdfdata)
        await pdfgenerater(res,pdfdata)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status:false,
            message:error.message
        })
    }},
    pdfbypuppeteer:async(req,res)=>{
        console.log('API Hit')
        console.log(' HTML template loaded successfully.');
        (async () => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(content, { waitUntil: 'networkidle0' });
            console.log(' HTML content set successfully.');
            const pdfPath = path.join(__dirname, '../uploads/invoice.pdf');
            await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true
            });
            console.log(' PDF generated successfully at:', pdfPath);
            res.send(pdfPath)
            await browser.close();
        } catch (error) {
            console.error(' Error generating PDF:', error);
        }
        })();
    },
    pdfwithraw:async(req,res)=>{
        try{
            const doc= new PDFDocument()
            doc.pipe(res)
            const texttodisplay = htmlToText(pdfdata.content, {
            wordwrap: 130
            });
            // console.log(texttodisplay);
            doc.fontSize(12).text(texttodisplay);
            doc.end()
        }
        catch(error){
            res.send(error.message)
        }

    }
}