"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_services_1 = __importDefault(require("../services/database.services"));
const categoriesRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /categories/all:
 *   get:
 *     summary: Returns all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoriesRoutes.get('/all', async (req, res) => {
    const data = await database_services_1.default.getAllCategories();
    res.send(data);
});
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Category not found
 */
categoriesRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const category = await database_services_1.default.findCategoryById(id);
    if (!category) {
        res.status(404).send('Category not found');
        return;
    }
    res.send(category);
});
exports.default = categoriesRoutes;
