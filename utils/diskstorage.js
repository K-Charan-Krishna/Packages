const multer = require("multer");
const fs=require('fs')
const fileFilterfun=function(req,file,cb){
    if (file.mimetype==='application/pdf') {
        console.log(file,'from middle ware to check size')
        console.log(parseInt(file.size)%1024>5)
        if (parseInt(file.size)%1024>5){
            cb(new Error('limited up to 5MB'))
        }else{
            cb(null, true);
        }
  } else {
    cb(new Error('Only PDF and Word files are allowed'), false); 
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file,'from middleware');
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    }
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploads = multer({
     storage: storage,
     fileFilter:fileFilterfun,    
     limits:{
        fileSize:5
    } });

module.exports=uploads