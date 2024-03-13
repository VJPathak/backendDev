const express = require("express");
// var bodyParser = require('body-parser');
const app = express();
// let path = require("path");
let routes = require("./routes/routes");
let session = require('express-session');
// let cookieParser = require('cookie-parser');

// app.use(cookieParser());

// app.use(cookieParser());
 
app.use(session({
    secret: "mySecretKey@12345",
    saveUninitialized: true,
    resave: true
}));
 
//app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

//Starting the server at port 3000
app.listen("backenddev-production-3f3c.up.railway.app", function() { 
  console.log('Server running on port 3000'); 
  console.log("Initiating Our Project :) ");
});

