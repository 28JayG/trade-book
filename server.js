const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const enforce = require('express-sslify');
const XLSX = require('xlsx');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true })); //enforce ssl
  app.use(express.static(path.join(__dirname, 'client/build'))); //set static files for node
  // active response to all paths
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const getTrades = async (req, res) => {
  try {
    //read xlsx file & extract firstname from the workbook
    const workbook = await XLSX.readFile('./data/SaudaBookTrades.xlsx', {
      type: 'binary',
    });
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    //convert worksheet to object array
    const xlRowObject = XLSX.utils.sheet_to_row_object_array(workSheet);
    const data = JSON.stringify(xlRowObject)
    //send data
    res.status(200).json({ status: 'success', trades: data });
  } catch (err) {
    res.status(500).json({ status: 'failure', err });
  }
};

app.get('/trades', getTrades);

// run server
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running at port ${port}`);
});
