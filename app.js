const express = require("express");
var bodyParser = require('body-parser');
const app = express();
let path = require("path");
let routes = require("./routes/routes");
let session = require('express-session');
// let cookieParser = require('cookie-parser');

// app.use(cookieParser());

// app.use(cookieParser());
 
app.use(bodyParser.json());
app.use(session({
    secret: "mySecretKey@12345",
    saveUninitialized: true,
    resave: true
}));
 
//app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => { 
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  next(); 
});

app.use(express.static('views'))
app.use('/', routes);
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static('config'))
// app.set('config', path.join(__dirname, 'config'));

//EJS Template
app.set('view engine','ejs');

//Starting the server at port 3000
app.listen(80, function() { 
  console.log('Server running on port 80'); 
  console.log("Initiating Our Project :) ");
  // console.log(process.env.CONNECTION)
});
// }).setTimeout(100000000);

