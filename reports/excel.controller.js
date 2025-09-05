const ExcelReports = require("../utils/excelreports")
const getclintContractDetails=require('./excel.services')



module.exports={
    excelreport:async(req,res)=>{
        try {
        const dbdata= await getclintContractDetails()
         await ExcelReports(res,dbdata)
        } catch (error) {
            res.send(error.message)
        }
    }
}    