const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const poll = require('./routes/poll');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


const port = 3000;
app.listen(port, ()=>
    console.log(`server started on ${port}`));