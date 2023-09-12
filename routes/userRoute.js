const express = require('express');
const { registration, Login } = require('../controllers/userController');

const route = express.Router();

route.route('/registration').post(registration);
route.route('/login').post(Login);

module.exports = route;

