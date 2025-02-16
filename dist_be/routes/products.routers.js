"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_data_1 = require("../data/product.data");
const productsRouters = (0, express_1.Router)();
productsRouters.get('/', (req, res) => {
    res.send('This is the products page');
});
productsRouters.get('/all', (req, res) => {
    res.json(product_data_1.products);
});
exports.default = productsRouters;
