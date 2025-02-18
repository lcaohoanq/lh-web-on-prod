"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_services_1 = __importDefault(require("../services/database.services"));
const productsRoutes = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product image URLs
 *         category:
 *           type: string
 *           description: The category of the product
 */
/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Returns all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productsRoutes.get('/all', async (req, res) => {
    const data = await database_services_1.default.getAllProducts();
    if (!data) {
        res.status(500).send({ error: 'An error occurred while retrieving products' });
    }
    res.send(data);
});
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Product not found
 */
productsRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await database_services_1.default.findProductById(id);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    res.send(product);
});
exports.default = productsRoutes;
