const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controller/user.controller');

const app = express();
const controller=new Controller();
app.use(bodyParser.json());

app.use('/user',controller.route);

app.use((error, req, res, next) => {
    res.send(error.message);
});

module.exports = { app };