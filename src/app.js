const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('./controller/user.controller');

const app = express();

app.use(bodyParser.json());
//mid уровня маршрутизатора
app.use('/user', route);

app.use((error, req, res, next) => res.send(error.messsage('error')))

module.exports = { app };