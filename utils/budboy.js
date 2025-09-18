const path = require('path');
const fs = require('fs');
const busboy = require('busboy');
const {uploadFile}=require('./s3upload');
const { file } = require('pdfkit');

const busboyupload = async (req, res) => {
 
  try {
    const bb = busboy({ headers: req.headers });
    let newFilename
    bb.on('file', async(fieldname, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(`Uploading: ${filename}`);
      

      const timestamp = Date.now();
      const ext = path.extname(filename);
      const baseName = path.basename(filename, ext);

      newFilename = `${baseName}_${timestamp}${ext}`;
      const uploadDir = path.join(__dirname, '../uploads');

      // Ensure uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      // bb.on('close', () => {
      //   console.log('Upload complete');
      //   
      // });
      res.send('File uploaded!');
      const saveTo = path.join(uploadDir, newFilename);
      console.log(`Saving to: ${saveTo}`);
      file.pipe(fs.createWriteStream(saveTo));
    });

    bb.on('field', (fieldname, val) => {
      console.log(`Field [${fieldname}]: value: ${val}`);
    });

    
    const uploadedFilename = newFilename; 
    console.log(uploadedFilename)
    const filePath = path.join(__dirname, 'uploads', uploadedFilename);

    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      console.log('File size:', fileBuffer.length);
      console.log('File size:', fileBuffer);
    } else {
      console.error('File not found:', filePath);
    }
    req.pipe(bb);
    


  } catch (error) {
    console.error(error);
    res.status(500).send('File upload failed');
  }
};



module.exports =busboyupload