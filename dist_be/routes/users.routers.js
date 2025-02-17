"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoutes = (0, express_1.Router)();
usersRoutes.get('/', (req, res) => {
    res.send('This is the users page');
});
exports.default = usersRoutes;
