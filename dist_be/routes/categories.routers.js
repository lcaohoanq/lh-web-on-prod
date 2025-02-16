"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_data_1 = require("../data/categories.data");
const categoriesRouters = (0, express_1.Router)();
categoriesRouters.get('/', (req, res) => {
    res.send('This is the category page');
});
categoriesRouters.get('/all', (req, res) => {
    res.json(categories_data_1.categories);
});
exports.default = categoriesRouters;
