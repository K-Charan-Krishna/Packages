const { diskUploadService } = require("./fileuploads.service");
const {uploadFile}=require('../utils/s3upload')
const busboyupload=require('../utils/budboy')
const generateTheExcel=require('../utils/readExcelBuffer')


module.exports = {
    diskUpload: async (req, res) => {
        try {
            console.log('API Hit');
            // console.log(req.file);
            console.log(req.file.size % 1024)
            console.log(req.body);
            let path="upload/filename";
            let addToDb=await diskUploadService(path);
            return res.send({ message: addToDb, file: req.file });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },
    memoryStorageupload:async(req, res)=>{
        try{
        console.log('from memory')
        const resFile=req.file
        console.log(resFile)
        const key=Date.now()+resFile.originalname
        const fileBuffer=resFile.buffer
        const mimetype=resFile.mimetype
        const responce_from= await uploadFile(key, fileBuffer, mimetype)
        return res.send({ message: 'File uploaded successfully', file: responce_from })
    }catch(error){
        return res.status(500).send({ error: error.message });
    }
    },
    busboyupload:async(req,res)=>{
        try {
            console.log('From Busboy')
            await busboyupload(req,res)
        } catch (error) {
            console.log(error.message)
             return res.status(500).send({ error: error.message });
        }

    },
    excelUpload:async(req,res)=>{
        try {
            const filedata=req.files.file
            const bufferData=filedata.data
            console.log(bufferData)
            let status=await generateTheExcel(bufferData)
            res.send(status)
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    }
}
