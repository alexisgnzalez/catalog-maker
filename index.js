const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cheerio = require('cheerio');
const axios = require('axios');

const inputFilePath = './InventarioAuraMakeupCaja1.csv';
const elemSelector =  'body > #tt-pageContent > .shopify-section > .product_page_template > link';
let readData = [];

const data = require('./RawInfoCatalogoMakeup.json');
console.log(data);

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send(readData);
});

app.listen(5000, () => {
  console.log('server started at 5000');
});

