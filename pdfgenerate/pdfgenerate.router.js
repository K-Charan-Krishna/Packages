const { pdfdownload,pdfbypuppeteer,pdfwithraw} = require('./pdfgenerate.controller')

const router=require('express').Router()



router.get('/test',pdfdownload)
router.get('/pdfpuppe',pdfbypuppeteer)
router.get('/pdfraw',pdfwithraw)

module.exports= router