const XLSX = require('xlsx');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path');
  process.exit(1);
}

try {
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  
  sheetNames.forEach(sheetName => {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    // Print first 50 rows to avoid too much output
    data.slice(0, 50).forEach(row => {
      console.log(row.join(' | '));
    });
  });
} catch (error) {
  console.error('Error reading file:', error.message);
}
