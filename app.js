const express = require('express')
const path = require('path')
const mongoose=require("mongoose")
var session = require('express-session')
const dotenv=require('dotenv').config()
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'mySessions'
  });
var flash = require('connect-flash');
const app = express()
const port = 3000
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded( {extended:false} ))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(flash())
app.use(require('./routes/signup.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/profile.routes'))
app.use(require('./routes/settings.routes'))
mongoose.set('useFindAndModify', false);
app.get('*', function(req, res){
  res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
});
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useUnifiedTopology:true }).then(()=>{
    console.log("db connected")
}).catch(error => handleError(error)); 
app.listen(process.env.PORT||port, () => {
    console.log('App listening on port 3000!');
});