const ExcelJS = require('exceljs');


const ExcelReports = async (res, data) => {
  try {
    const { heading, rows } = data;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('reports');
    
    worksheet.columns=heading.map(item=>({
        header:item,
        key:item,
        width:35,
    }))

    console.log(heading)
    worksheet.getRow(1).eachCell((cell)=>{
        cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFB6D7A8' } 
         };
        cell.font = { bold: true, color: { argb: 'FF000000' } }; 
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    })
    rows.forEach(data => {
    worksheet.addRow(data);
    const row = worksheet.lastRow;
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const key = worksheet.columns[colNumber - 1].key; // get the key (e.g., 'clientEmail')
            const value = data[key]; // get original value
            console.log(key,value)

            if (value === 'null' || value === undefined || value === '') {
                console.log('Inside')
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFC7CE' } // light red
            };

            cell.font = {
                color: { argb: 'FF000000' }, // black text
                italic: true
            };

            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            // Optional: center the cell content
            cell.alignment = { horizontal: 'center', vertical: 'middle' };

            // Optional: set a placeholder
            if (!cell.value) {
                cell.value = 'Missing';
            }
            }
            cell.alignment = { horizontal: 'center', vertical: 'middle' }
        });
    });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="report-${Date.now()}.xlsx"`
    );


    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Failed to generate Excel file',
        error: error.message
      });
    } else {

      console.error('Excel export failed after response started:', error.message);
    }
  }
};

module.exports = ExcelReports;
