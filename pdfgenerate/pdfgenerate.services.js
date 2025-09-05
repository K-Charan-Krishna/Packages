

module.exports={
    pdfservices:()=>{
        try {
            return "PDF Generated success"
        } catch (error) {
            return error.message
        }
    }
}