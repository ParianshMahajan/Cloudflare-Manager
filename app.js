const express = require('express');
const path=require('path');
const app = express();
const bodyParser = require('body-parser');

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


var cors = require('cors');
const { displayRecords, deleteRecords, createRecord } = require('./Controller');
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, "views")));



app.get('/', displayRecords )
app.post('/create', createRecord )
app.post('/delete', deleteRecords )




let port = process.env.PORT || 4018;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

