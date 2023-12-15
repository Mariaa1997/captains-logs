require('dotenv').config(); // Load ENV Variables
const express = require('express'); //import express
const methodOverride = require('method-override'); 
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001;

const app = express();

const Logs = require('./models/logs');
const jsxViewEngine = require('jsx-view-engine');

// global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

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
    res.send(`<h1>Captain's Logs</h1> <a href = ${'/logs'} > Go to Index Page</a> <br/>`)
   
})
//Index route
app.get('/logs/', async (req, res) => {
    // res.send(fruits);
    try {
        const foundLogs = await Logs.find({});
        res.status(200).render('Index', {logs: foundLogs});
    } catch (err) {
        res.status(400).send(err);
    }
    
});


// New Route
app.get('/new', (req, res) => {
//     res.send("<h1>New Page</h1>")
res.render('New')
})

// D - DELETE - PERMANENTLY removes a fruit from the db
app.delete('/logs/:id', async (req, res)=> {
    // res.send('deleting...');
    try{
        const deletedLogs = await Logs.findByIdAndDelete(req.params.id);
        console.log(deletedLogs)
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }

})

//U - UPDATE - makes the actual changes to the database
app.put('/logs/:id', async (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    try {
        const updatedLogs = await Logs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        console.log(updatedLogs);
        res.status(200).redirect(`/logs/${req.params.id}`);
    } catch (err) {
    res.status(400).send(err)
}})


//Create Route
app.post('/logs', async (req, res)=> {
    if(req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    try {
        const createdLogs = await Logs.create(req.body);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }
    // res.send(req.body)
    // console.log(req.body)
})

 // E -EDIT - allows a user to privide the inputs to change the fruit
 app.get('/logs/:id/edit', async (req, res)=> {
    try{
        const foundLog = await Logs.findById(req.params.id);
        res.status(200).render("Edit", {log: foundLog});
    } catch (err) {
        res.status(400).send(err)
    }
    
 })

// S - SHOW - show route displays details of an individual fruit
app.get('/logs/:id', async (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundLog = await Logs.findById(req.params.id)
        res.render('Show', { log: foundLog});
    }catch (err){
        res.status(400).send(err);
    }
})


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})