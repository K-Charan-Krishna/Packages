const ExcelJS = require('exceljs');

const ExcelReports = async (res, reportData) => {
  try {
    const { headings,data } = reportData;
    console.log(headings,data)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('reports');
    worksheet.columns = headings.map(header => ({
      header,
      key: header,
      width: 20
    }));
    data.forEach((dataToAdd)=>{
      worksheet.addRow(dataToAdd)
    })
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
