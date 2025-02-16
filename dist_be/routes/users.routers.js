"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const usersRoutes = (0, express_1.Router)();
usersRoutes.get('/', (req, res) => {
    res.send('This is the users page');
});
usersRoutes.get('/account', users_controllers_1.accountController);
usersRoutes.get('/getMe', users_controllers_1.getMeController);
usersRoutes.post('/login', users_middlewares_1.loginValidator, users_controllers_1.loginController);
usersRoutes.post('/register', users_middlewares_1.registerValidator, users_controllers_1.registerController);
exports.default = usersRoutes;
