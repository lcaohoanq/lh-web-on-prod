"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
(0, dotenv_1.config)({ path: __dirname + '/../../.env' });
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@luuhai-web-db.l3neh.mongodb.net/?retryWrites=true&w=majority&appName=luuhai-web-db`;
const dbCollection = process.env.DB_COLLECTION;
class DatabaseServices {
    constructor() {
        if (!process.env.MONGO_USER || !process.env.MONGO_PASSWORD || !process.env.DB_NAME) {
            throw new Error('Missing required environment variables for database connection');
        }
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(process.env.DB_NAME);
    }
    // Connection method
    async connect() {
        try {
            await this.db.command({ ping: 1 });
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }
    // Product CRUD Operations
    async createProduct(productData) {
        try {
            const result = await this.db.collection('products').insertOne({
                ...productData,
                createdAt: new Date(),
            });
            if (result.insertedId) {
                return {
                    ...productData,
                    id: result.insertedId.toString(),
                };
            }
            return null;
        }
        catch (error) {
            console.error('Create product error:', error);
            throw error;
        }
    }
    async findProductById(id) {
        try {
            const product = await this.db.collection('products').findOne({ _id: new mongodb_1.ObjectId(id) });
            if (product) {
                return {
                    id: product._id.toString(),
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    category: product.category,
                    createdAt: product.createdAt,
                };
            }
            return null;
        }
        catch (error) {
            console.error('Get product error:', error);
            throw error;
        }
    }
    async updateProduct(id, productData) {
        try {
            const result = await this.db
                .collection('products')
                .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: productData }, { returnDocument: 'after' });
            if (result) {
                return {
                    id: result.value._id.toString(),
                    name: result.value.name,
                    description: result.value.description,
                    price: result.value.price,
                    images: result.value.images,
                    category: result.value.category,
                    createdAt: result.value.createdAt,
                };
            }
            return null;
        }
        catch (error) {
            console.error('Update product error:', error);
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const result = await this.db.collection('products').deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        }
        catch (error) {
            console.error('Delete product error:', error);
            throw error;
        }
    }
    // Category CRUD Operations
    async createCategory(categoryData) {
        try {
            const result = await this.db.collection('categories').insertOne(categoryData);
            if (result.insertedId) {
                return {
                    ...categoryData,
                    id: result.insertedId.toString(),
                };
            }
            return null;
        }
        catch (error) {
            console.error('Create category error:', error);
            throw error;
        }
    }
    async findCategoryById(id) {
        try {
            const category = await this.db.collection('categories').findOne({ _id: new mongodb_1.ObjectId(id) });
            if (category) {
                return {
                    id: category._id.toString(),
                    name: category.name,
                    slug: category.slug,
                };
            }
            return null;
        }
        catch (error) {
            console.error('Get category error:', error);
            throw error;
        }
    }
    async updateCategory(id, categoryData) {
        try {
            const result = await this.db
                .collection('categories')
                .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: categoryData }, { returnDocument: 'after' });
            if (result) {
                return {
                    id: result.value._id.toString(),
                    name: result.value.name,
                    slug: result.value.slug,
                };
            }
            return null;
        }
        catch (error) {
            console.error('Update category error:', error);
            throw error;
        }
    }
    async deleteCategory(id) {
        try {
            const result = await this.db.collection('categories').deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        }
        catch (error) {
            console.error('Delete category error:', error);
            throw error;
        }
    }
    // Utility methods
    async getAllProducts() {
        try {
            const products = await this.db.collection('products').find().toArray();
            return products.map((product) => ({
                id: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                category: product.category,
                createdAt: product.createdAt,
            }));
        }
        catch (error) {
            console.error('Get all products error:', error);
            throw error;
        }
    }
    async getAllCategories() {
        try {
            const categories = await this.db.collection('categories').find().toArray();
            return categories.map((category) => ({
                id: category._id.toString(),
                name: category.name,
                slug: category.slug,
            }));
        }
        catch (error) {
            console.error('Get all categories error:', error);
            throw error;
        }
    }
    async getProductsByCategory(categoryId) {
        try {
            const products = await this.db
                .collection('products')
                .find({ category: categoryId })
                .toArray();
            return products.map((product) => ({
                id: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                category: product.category,
                createdAt: product.createdAt,
            }));
        }
        catch (error) {
            console.error('Get products by category error:', error);
            throw error;
        }
    }
    // User Operations
    async findUserByEmail(email) {
        try {
            const user = await this.db.collection('users').findOne({ email });
            return user;
        }
        catch (error) {
            console.error('Find user error:', error);
            throw error;
        }
    }
    async createUser(userData) {
        try {
            const result = await this.db.collection('users').insertOne({
                ...userData,
                createdAt: new Date(),
            });
            return {
                ...userData,
                _id: result.insertedId.toString(),
            };
        }
        catch (error) {
            console.error('Create user error:', error);
            throw error;
        }
    }
    async findAllUsers() {
        try {
            const users = await this.db.collection('users').find().toArray();
            return users.map((user) => ({
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role,
                createdAt: user.createdAt,
            }));
        }
        catch (error) {
            console.error('Find all users error:', error);
            throw error;
        }
    }
    async findUserById(id) {
        try {
            const user = await this.db.collection('users').findOne({ _id: new mongodb_1.ObjectId(id) });
            return user;
        }
        catch (error) {
            console.log('Error in finding user by id:', error);
            return null;
        }
    }
}
const databaseServices = new DatabaseServices();
exports.default = databaseServices;
