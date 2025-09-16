const multer = require("multer");

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
const storage2=multer.memoryStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({
    storage:storage2,
    fileFilter:fileFilterfun
})

module.exports= upload