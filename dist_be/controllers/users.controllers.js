"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchPasswordAndConfirmPassword = exports.registerController = exports.loginController = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const loginController = async (req, res) => { };
exports.loginController = loginController;
const registerController = async (req, res) => { };
exports.registerController = registerController;
const isMatchPasswordAndConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};
exports.isMatchPasswordAndConfirmPassword = isMatchPasswordAndConfirmPassword;
