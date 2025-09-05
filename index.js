const express = require('express');
const fs = require('fs');
const multer = require('multer');
const mongoose=require('mongoose')

const app = express();
const PORT = 5002;

const fileRouter=require('./fileuploads/fileuploads.router')
const pdfgen= require('./pdfgenerate/pdfgenerate.router')
const excelreport=require('./reports/excel.router')
const url="mongodb://127.0.0.1/cvws-new"

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use('/api',fileRouter)
app.use('/api',pdfgen)
app.use('/api',excelreport)



app.use((err, req, res, next) => {
  // For JSON body too large
  if (err.type === 'entity.too.large') {
    return res.status(413).send('JSON body too large (max 5KB)');
  }

  // For Multer file size limit
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send('File size exceeds 2MB limit');
  }

  // Catch-all
  return res.status(500).send('Something went wrong');
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
