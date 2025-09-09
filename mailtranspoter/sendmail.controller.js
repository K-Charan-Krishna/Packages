const sendMail=require('../utils/sendmail')
const cron = require('node-cron');



module.exports={
    sendmail:async(req,res)=>{
        try {
            const {fromAddres,toAddress,subject,message}=req.body
            let responcefrommail
            cron.schedule('0 0 5 * *', async() => {
                 responcefrommail= await sendMail(fromAddres,toAddress,subject,message)
                 console.log(responcefrommail)
            });
            res.send(responcefrommail)
            
        } catch (error) {
            res.send(error.message)
        }
    }
}