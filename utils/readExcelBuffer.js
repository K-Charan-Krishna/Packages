const ExcelJS = require('exceljs');

const generateTheExcel = async (buffer) => {
    try {
        let workbook = new ExcelJS.Workbook()
        await workbook.xlsx.load(buffer)
        let outputdata = {}
        let headers
        workbook.eachSheet((sheet, sheetnumber) => {
            headers = []
            let row1 = sheet.getRow(1)
            row1.eachCell((cell, cellnumber) => {
                headers.push(cell.value)
            })
            console.log(headers)
            let sheetData = []
            sheet.eachRow((row, rownumber) => {
                if (rownumber >= 2) {
                    let addObj = {}
                    if (rownumber != 1) {
                        row.eachCell((cell, cellnumber) => {
                            addObj[headers[cellnumber - 1]] = cell.value
                        })
                    }
                    sheetData.push(addObj)
                }
            })
            outputdata[sheet.name] = sheetData
        })
        console.log(outputdata)
        return outputdata
    } catch (error) {
        return error.message
    }
}

module.exports = generateTheExcel