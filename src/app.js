const express = require('express');
const bodyParser = require('body-parser');
const routeUser = require('./controller/user.controller');

const app = express();
app.use(bodyParser.json());

app.use('/user',routeUser);

app.use((error, req, res, next) => {
    res.send(error.message);
});

module.exports = { app };