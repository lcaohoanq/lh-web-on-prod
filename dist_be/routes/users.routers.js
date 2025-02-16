"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const usersRoutes = (0, express_1.Router)();
usersRoutes.get('/', (req, res) => {
    res.send('This is the users page');
});
usersRoutes.get('/getMe', users_controllers_1.getMeController);
// usersRoutes.post('/login', loginValidator, loginController);
// usersRoutes.post('/register', registerValidator, registerController);
exports.default = usersRoutes;
