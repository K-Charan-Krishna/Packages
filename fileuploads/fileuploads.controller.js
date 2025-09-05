const { diskUploadService } = require("./fileuploads.service");


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
        console.log(req.file)
        return res.send({ message: 'File uploaded successfully', file: req.file })
    }catch(error){
        return res.status(500).send({ error: error.message });
    }
    }
}
