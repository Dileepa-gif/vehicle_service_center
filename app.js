
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
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

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))



// Set Views
app.use(expressLayouts);
app.set('layout', './layouts/sidebar-layout')
app.set('view engine', 'ejs');


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


// Routes
app.use('/', routes);

// app.get('', (req, res) => {
//     res.render('index', { text: 'This is EJS', title : 'Home Page'})
// })

// app.get('/about', (req, res) => {
//     res.render('about', { layout:'./layouts/sidebar-layout', text: 'About Page', title : 'About Page'})
// })



app.listen(configs.serverPort, () => {
    console.log(`Listing to port ${configs.serverPort}`);
});

