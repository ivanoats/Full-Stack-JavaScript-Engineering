'use strict';

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
console.log('gitbook express server started');
