
const express = require('express');
const app = express();
const template = require('hbs');
var bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./routes');
const { json, urlencoded } = require('body-parser');
const path = require('path');
require("dotenv").config({ path: ".env"});
const pjax = require('express-pjax');


const configs = require("./configs/app-config");
app.use(bodyParser.urlencoded({extends: false})); 
app.use(bodyParser.json()); 


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src/views/template/controllers')));

const templatePath = path.join(__dirname, '/views');
const partialPath = path.join(__dirname, '/views/template/admin');

app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.set('views', templatePath);
app.use(pjax());
template.registerPartials(partialPath);


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "*", 
        credentials: true,
    })
);



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE , GET ,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// Routes
app.use('/', routes);


app.listen(configs.serverPort, () => {
    console.log(`Listing to port ${configs.serverPort}`);
});
