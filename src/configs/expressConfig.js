const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
const {authenticationMiddle} = require('../middleware/authMiddle')

const expressConfig=(app)=>{
    const staticFiles = express.static(path.resolve(__dirname,'../public'));
    app.use(staticFiles);
    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser());
    app.use(authenticationMiddle)
}

module.exports =expressConfig