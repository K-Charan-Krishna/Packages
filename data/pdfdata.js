const headings = ['Sales', 'Marketing', 'Development', 'CustomerSupport', 'HR', 'Others'];
const data = [
  { Sales: 1200, Marketing: 800, Development: 1500, CustomerSupport: 300, HR: 200, Others: 100 },
  { Sales: 1300, Marketing: 750, Development: 1600, CustomerSupport: 350, HR: 210, Others: 120 },
  { Sales: 1250, Marketing: 820, Development: 1550, CustomerSupport: 320, HR: 230, Others: 110 },
  { Sales: 1400, Marketing: 790, Development: 1650, CustomerSupport: 400, HR: 220, Others: 130 },
  { Sales: 1350, Marketing: 810, Development: 1580, CustomerSupport: 380, HR: 240, Others: 140 }
];
 let content='<p>Dear &lt;&lt;Candidate Name&gt;&gt;,</p><p>Greetings from Verifacts!</p><p>This is a gentle reminder regarding your pending background verification process for our client, &lt;&lt;Client Name&gt;&gt;. Our records indicate that you have not yet completed the required data entry and document upload on the Verifacts background verification portal.</p><p>To avoid delays in your on-boarding process, please log in at your earliest convenience and provide the necessary information and documents using the credentials sent earlier: URL : https://vibe.verifacts.ph/cde</p><p>User Id : (USER ID)</p><p>Password: (PASSWORD)</p><p></p><p>If you are facing any below mentioned issue, kindly contact Verifacts POC for assistance.</p><p>· Unable to login the portal</p><p>· Unable to incorporate/fill the data on the fields</p><p>· Unable to upload the documents</p><p>· Unable to save the details</p><p>· Unable to complete/submit the data entry</p><p>Please do not reply to this email as this is a system generated email.</p><p>Thank you,</p><p>Team Verifacts</p><p>Disclaimer: This message and any attachment(s) contained here are information that is confidential, proprietary to Verifacts Inc. and its clients. Contents may be privileged or otherwise protected by law. The information is solely intended for the individual or the entity it is addressed to. If you are not the intended recipient of this message, you are not authorized to read, forward, print, retain, copy or disseminate this message or any part of it. If you have received this e-mail in error, please notify the sender immediately by return e-mail and delete it from your computer. This email and attachments are scanned for viruses. The recipient should recheck this email and any attachments for the presence of viruses. The company accepts no liability for any damage caused by any virus transmitted by this email.</p>'

const pdfdata={
    headings,
    data,
    content
}
module.exports=pdfdata