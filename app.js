
const express = require('express');
const app = express();

const session = require('express-session');
const coolieParser = require('cookie-parser');
const flash =  require('connect-flash');

var bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./routes');
const { json, urlencoded } = require('body-parser');
const path = require('path');
require("dotenv").config({ path: ".env"});
const pjax = require('express-pjax');


const configs = require("./configs/app-config");
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());



app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE , GET ,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});



app.use(coolieParser('qwertyuiop'));
app.use(session({
    secret : 'asdfghjkl',
    cookie: {maxAge : 60000},
    resave: true,
    saveUninitialized: true
}));

app.use(flash());



app.use('/', routes);

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,'/Client/build')))
    app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname,'Client', 'build', 'index.html'));
    })
  }else{
    app.get("/", (req, res) => {
      res.send("Api running");
    })
  }


  



app.listen(configs.serverPort, () => {
    console.log(`Listing to port ${configs.serverPort}`);
});

