const { pdfservices } = require("./pdfgenerate.services");
const pdfdata=require("../data/pdfdata")
const pdfgenerater=require('../utils/pdfgenerater');
const { stack } = require("./pdfgenerate.router");
// console.log(pdfdata)
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
    }}
}