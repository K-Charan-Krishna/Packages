const ExcelReports = require("../utils/excelreports")
const getclintContractDetails=require('./excel.services')
const pdfdata=require('../data/pdfdata')



module.exports={
    excelreport:async(req,res)=>{
        try {
            const {headings,data}=pdfdata
        // const dbdata= await getclintContractDetails()
         await ExcelReports(res,{headings,data})
        } catch (error) {
            res.send(error.message)
        }
    }
}    