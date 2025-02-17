"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const express_1 = require("express");
const productsRoutes = (0, express_1.Router)();
exports.products = [
    {
        id: '1',
        name: 'Sample Product',
        description: 'This is a sample product',
        price: 99.99,
        images: [
            'https://cdn.tgdd.vn/Products/Images/44/325242/Slider/dell-inspiron-15-3520-i5-1235u-16gb-512gb-120hz-officehs-win11-n5i5052w1638557748484267591.jpg',
            'https://cdn.tgdd.vn/Products/Images/44/325242/Slider/dell-inspiron-15-3520-i5-1235u-16gb-512gb-120hz-officehs-win11-n5i5052w1638557748484267591.jpg',
        ],
        category: 'Electronics',
    },
    {
        id: '2',
        name: 'Sample Product',
        description: 'This is a sample product',
        price: 99.99,
        images: [
            'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://cdn.tgdd.vn/Products/Images/44/328946/dell-inspiron-15-3530-i7-71043888-1-750x500.jpg',
        ],
        category: 'Electronics',
    },
    {
        id: '3',
        name: 'Sample Product',
        description: 'This is a sample product',
        price: 99.99,
        images: [
            'https://cdn.tgdd.vn/Products/Images/44/321193/Slider/vi-vn-dell-inspiron-15-3520-i5-71027003-slider-1.jpg',
        ],
        category: 'Electronics',
    },
    {
        id: '4',
        name: 'Sample Product',
        description: 'This is a sample product',
        price: 99.99,
        images: ['https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-750x500.jpg'],
        category: 'Electronics',
    },
    {
        id: '5',
        name: 'Sample Product',
        description: 'This is a sample product',
        price: 99.99,
        images: [
            'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/2162/329603/loa-bluetooth-marshall-willen-ii-den-7-638654518713802947-750x500.jpg',
        ],
        category: 'Electronics',
    },
    {
        id: '6',
        name: 'Sample Product',
        description: 'This is a sample product',
        price: 99.99,
        images: [
            'https://cdn.tgdd.vn/Products/Images/54/327554/tai-nghe-bluetooth-true-wireless-samsung-galaxy-buds-3-pro-r630n-xam-4-750x500.jpg',
        ],
        category: 'Electronics',
    },
];
productsRoutes.get('/', (req, res) => {
    res.send('This is the products page');
});
productsRoutes.get('/all', (req, res) => {
    res.send(exports.products);
});
productsRoutes.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = exports.products.find((product) => product.id === id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.send(product);
});
exports.default = productsRoutes;
