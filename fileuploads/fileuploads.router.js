const uploads=require('../utils/diskstorage')
const upload=require('../utils/memorystorage')

const { diskUpload, memoryStorageupload } = require('./fileuploads.controller');



const router=require('express').Router();

router.post('/upload',uploads.single('file'),diskUpload)
router.post('/buffer',upload.single('file'),memoryStorageupload)


module.exports=router;
