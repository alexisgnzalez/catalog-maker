const express = require('express');
const cors = require('cors');
let readData = [];

readData = require('./RawInfoCatalogoMakeup.json');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send(readData);
});

app.listen(5000, () => {
  console.log('server started at 5000');
});

