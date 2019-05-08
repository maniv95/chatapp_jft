var http = require('http');
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');
var express = require('express');
const path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser');
var app = module.exports = express();
var cors = require('cors');
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit:500}));
app.use(bodyParser.json({limit: "10mb"}));
app.use(cors());
app.use('/api/',routes.users);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = process.env.PORT || 8081;
app.listen(port,()=>{
    console.log("Backend Server Started On Port : " + port);
});