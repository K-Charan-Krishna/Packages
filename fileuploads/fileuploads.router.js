const uploads=require('../utils/diskstorage')
const upload=require('../utils/memorystorage')

const { diskUpload, memoryStorageupload,busboyupload,excelUpload } = require('./fileuploads.controller');



const router=require('express').Router();

router.post('/upload',uploads.single('file'),diskUpload)
router.post('/buffer',upload.single('file'),memoryStorageupload)
router.post('/busboy',busboyupload)
router.post('/excelbulk',excelUpload)


module.exports=router;
