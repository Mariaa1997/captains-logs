require('dotenv').config(); // Load ENV Variables
const express = require('express'); //import express
const methodOverride = require('method-override'); 
const mongoose = require('mongoose')

const app = express();

const Logs = require('./models/logs');
const jsxViewEngine = require('jsx-view-engine');

//global configuration
// const mongoURI = process.env.MONGO_URI;
// const db = mongoose.connection;

// // Connect to Mongo
// mongoose.connect(mongoURI);
// mongoose.connection.once('open', () => {
//     console.log('connected to mongo');
// })

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

//MiddleWare
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near top, around the other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})

// New Route
app.get('/new', (req, res) => {
//     res.send("<h1>New Page</h1>")
res.render('New')
})

//Create Route
app.post('/logs', async (req, res)=> {
    if(req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    res.send(req.body)
    console.log(req.body)
})

app.listen(3001, () => {
    console.log('listening');
})