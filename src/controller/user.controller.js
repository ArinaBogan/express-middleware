const express = require('express');
const Service = require('../service/user.service');
const { isValidUserId, isValidUserData } = require('../helper/validation');
const buildResponse = require('../helper/buildResponse');

const service = new Service();

class Controller {
    constructor() {
        this.route = express.Router();
        this.initPoute()
    }
    initPoute() {
        this.route.get('/', (req, res) => {
            try {
                const data = service.getAllUsers();
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        });

        this.route.get('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const data = service.getUserById(id)
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        });

        this.route.post('/', isValidUserData, (req, res) => {
            try {
                const { name, surname, email, pwd } = req.body;
                const data = service.createUser(name, surname, email, pwd);
                buildResponse(res, 201, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        });

        this.route.put('/:id', isValidUserId, isValidUserData, (req, res) => {
            try {
                const { id } = req.params;
                const { name, surname, email, pwd } = req.body;
                const data = service.updateUserById(id, name, surname, email, pwd);
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 401, error.message);
            }
        });

        this.route.patch('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const clientObj = req.body;
                const data = service.patchUser(id, clientObj);
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 401, error.message);
            }
        });

        this.route.delete('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const data = service.deleteUserById(id)
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        });
    }
}

module.exports = Controller;