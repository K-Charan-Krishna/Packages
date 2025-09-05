const { pdfdownload } = require('./pdfgenerate.controller')

const router=require('express').Router()



router.get('/test',pdfdownload)

module.exports= router