const express = require('express');
const cors = require('cors'); // Import the cors package
const fs = require('fs');
const csv = require('csv-parser');
const cheerio = require('cheerio');
const axios = require('axios');

const inputFilePath = './InventarioAuraMakeupCaja1.csv';
const elemSelector =  'body > #tt-pageContent > .shopify-section > .product_page_template > link';
let readData = []; 

fs.createReadStream(inputFilePath)
  .pipe(csv()) 
  .on('data', (data) => {
    try {
      readData.push(data);
    } catch (err) {
      console.log('erronio', err);
    }
  }).on('end', async () => {
    console.log('Finished reading -> Starting Crawling', new Date());
    
    let $;
    let noLinkCount = 0;
    readData.forEach((item, index) => {
      setTimeout(async () => {
        if (item.Link === '') {
          if (item.AlternateLink === '') {
            item.image = 'https://placehold.co/600x600?text=No+Image';
            noLinkCount++;
            console.log('amount of placeholders', noLinkCount);
          } else {
            item.image = item.AlternateLink;
            noLinkCount++;
            console.log(item.AlternateLink);
          }
        } else {
          await axios(item.Link).then((response) => {
            $ = cheerio.load(response.data); 
            item.image = $(elemSelector)[0].attribs.content;
            console.log(item.image);
          });
        }
      }, index * 500);
    })
  });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send(readData);
});

app.listen(5000, () => {
  console.log('server started at 5000');
});

