// fs - file system operations
// fast-csv - parsing and writing to csv files
// path - handling file paths
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const csvFilePath = path.join(__dirname, 'ranking.csv');
const maxRecords = 100;

// Initialize the data array
let data = [];

// Parse command line arguments
// - remove first 2 arguments from the input (.slice(2))
const args = process.argv.slice(2);
// - reduce transorms the arguments into a dictionary object
const newRecord = args.reduce((obj, arg) => {
  const [key, value] = arg.split('=');
  obj[key.toLowerCase()] = value;
  return obj;
}, {});

// Validate the new record
if (!/^\d{4}-\d{2}-\d{2}$/.test(newRecord.date) ||
    !/^[^\;:@_-]{1,50}$/.test(newRecord.name) ||
    !/^\d+$/.test(newRecord.score)) {
  console.error('Invalid input format.');
  process.exit(1);
}

// Convert score to a number for accurate sorting
newRecord.score = parseInt(newRecord.score, 10);

// Check if the CSV file exists
if (!fs.existsSync(csvFilePath)) {
  console.error('CSV file not found.');
  process.exit(1);
}

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv.parse({ headers: true })) // treat the first row as headers
  .on('data', (row) => {
    // Convert score to a number and filter out invalid rows
    if (row.score) {
      row.score = parseInt(row.score, 10);
      data.push(row);
    }
  })
  .on('end', () => {
    // Add the new record
    data.push(newRecord);

    // Sort the data
    data.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));

    // Keep only the top 100 records
    const updatedData = data.slice(0, maxRecords);

    // Write to CSV
    const writeStream = fs.createWriteStream(csvFilePath);
    writeStream.on('finish', () => console.log('CSV successfully updated!'));
    csv.write(updatedData, { headers: true }).pipe(writeStream);
  });
