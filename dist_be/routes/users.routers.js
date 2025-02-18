"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_services_1 = __importDefault(require("../services/database.services"));
const users_services_1 = __importDefault(require("../services/users.services"));
const usersRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
usersRoutes.get('/all', async (req, res) => {
    try {
        const result = await users_services_1.default.findAll();
        res.send(result);
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving users' });
    }
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 */
usersRoutes.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await database_services_1.default.findUserById(id);
        res.send(data);
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving the user' });
    }
});
exports.default = usersRoutes;
