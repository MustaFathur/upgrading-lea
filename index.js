const express = require("express");
const route = require('./routes/index')
const cookieParser = require('cookie-parser')
const db = require('./config/db')
require('dotenv/config')

require('./models/user');
require('./models/article');

const PORT = process.env.PORT || 8081;
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(route)

db.sync()
  .then(() => {
    console.log('berhasil connect ke database');
    app.listen(PORT, () => {
      console.log(`server berjalan di port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('error:', error);
  });