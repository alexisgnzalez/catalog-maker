const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const inputFilePath = './InventarioAuraMakeupCaja1.csv';
let readData = [];

fs.createReadStream(inputFilePath) 
  .pipe(csv())
  .on('data', (data) => {
    try {
      readData.push(data);
    } catch (err) {
      console.log('erronio', err);
    }
  }).on('end', () => {
    console.log('Terminé de leer la data', new Date());
  });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(readData);
});

app.listen(5000, () => {
  console.log('server started at 5000');
});

