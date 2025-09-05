const router=require('express').Router()
const {excelreport}=require('./excel.controller')

router.get('/reports',excelreport)

module.exports=router