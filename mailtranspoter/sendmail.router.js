const router=require('express').Router()
const {sendmail}=require('./sendmail.controller')


router.post('/sendmail',sendmail)

module.exports=router