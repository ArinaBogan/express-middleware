const express = require('express');
const { getAllUsers, deleteUserById, getUserById, updateUserById, createUser, patchUser } = require('../service/user.service');

const route = express.Router();

route.get('/', (req, res) => {
    try {
        const data = getAllUsers();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const data = getUserById(id)
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.post('/', (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = createUser(name, surname, email, pwd);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = updateUserById(id, name, surname, email, pwd);
        res.status(201).send(data);
    } catch (error) {
        res.status(401).send(error.message)
    }
});

route.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const clientObj = req.body;
        const data = patchUser(id, clientObj);
        res.status(201).send(data);
    } catch (error) {
        res.status(401).send(error.message)
    }
});

route.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const data = deleteUserById(id)
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = route;