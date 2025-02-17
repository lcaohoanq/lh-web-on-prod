"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = void 0;
const express_1 = require("express");
const categoriesRoutes = (0, express_1.Router)();
exports.categories = [
    { id: '1', name: 'Laptop', slug: 'laptop' },
    { id: '2', name: 'Laptop Cũ', slug: 'laptop-cu' },
    { id: '3', name: 'Phụ Kiện', slug: 'phu-kien' },
    { id: '4', name: 'Tai Nghe', slug: 'tai-nghe' },
    { id: '5', name: 'Loa', slug: 'loa' },
    { id: '6', name: 'Màn hình', slug: 'manhinh' },
    { id: '7', name: 'Mực in, Máy in', slug: 'loa' },
];
categoriesRoutes.get('/', (req, res) => {
    res.send('This is the categories page');
});
categoriesRoutes.get('/all', (req, res) => {
    res.send(exports.categories);
});
exports.default = categoriesRoutes;
