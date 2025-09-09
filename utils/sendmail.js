const nodemailer=require('nodemailer')
require('dotenv').config();

const sendMail= async(fromAddress,toAddress,subject,message)=>{
    try{
        console.log(process.env.APP_PASS_WORD)
        console.log(fromAddress,toAddress,subject,message)
        const transpoter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.APP_PASS_WORD
        }

    })
    const messagetoSend = `
    <img src="https://verifacts.co.in/wp-content/uploads/2021/10/Pictur1-removebg-preview.png" alt="Header Image" width="300" />
    <h1 style="color: green;">Hi from Nodemailer</h1>
    <p>${message}</p>
    <p>${new Date()}</p>
    `;

    const mailoption={
        from:fromAddress,
        to:toAddress,
        subject,
        html:messagetoSend
    }
    transpoter.sendMail(mailoption)
    return 'mail sent'
    }
    catch(error){
        throw new Error(error.message)
    }
}

module.exports=sendMail