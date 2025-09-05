
const PDFDocument=require('pdfkit')
const startX = 50;
let startY = 80;
const rowHeight = 25;
const colWidth = 90;
const  pdfgenerater=async (res,PdfData)=>{
    try{
        const {headings,data}=PdfData
        const doc= new PDFDocument()
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res)
        for (let i = 0; i < headings.length; i++) {
            // Draw text
        doc.fontSize(12).text(headings[i], startX + i * colWidth, startY+6, {
            width: colWidth,
                align: 'center'
        });

            // Draw cell border
        doc.rect(startX + i * colWidth, startY, colWidth, rowHeight).stroke();
        }

            // 2. Draw Table Data
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < headings.length; j++) {
                const key = headings[j];
                const value = data[i][key];

                const x = startX + j * colWidth;
                const y = startY + rowHeight * (i + 1);

                    // Draw text
                doc.fontSize(12).text(String(value), x, y+6, {
                width: colWidth,
                align: 'center'
                });

                    // Draw cell border
                doc.rect(x, y, colWidth, rowHeight).stroke();
                }
            }
           doc.end()
        }
        catch(err){
            throw new Error('Something Went Wrong While Generating PDF')
        }
}

module.exports=pdfgenerater