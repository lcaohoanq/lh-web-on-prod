"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseServices = void 0;
const prisma_services_1 = __importDefault(require("./prisma.services"));
const auth_1 = require("../utils/auth");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: __dirname + '/../../.env' });
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@luuhai-web-db.l3neh.mongodb.net/?retryWrites=true&w=majority&appName=luuhai-web-db`;
const dbCollection = process.env.DB_COLLECTION;
class DatabaseServices {
    async connect() {
        try {
            await prisma_services_1.default.$connect();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // User services
    async createUser(username, password) {
        const { hashedPassword, salt } = (0, auth_1.hashPassword)(password);
        return prisma_services_1.default.user.create({
            data: {
                username,
                password: hashedPassword,
                salt,
            },
        });
    }
    async findUserByUsername(username) {
        return prisma_services_1.default.user.findUnique({
            where: { username },
        });
    }
    // Product services
    async createProduct(data) {
        return prisma_services_1.default.product.create({ data });
    }
    async getProducts(userId) {
        return prisma_services_1.default.product.findMany({
            where: userId ? { userId } : undefined,
            include: {
                category: true,
                user: true,
            },
        });
    }
    // Category services
    async createCategory(name) {
        return prisma_services_1.default.category.create({
            data: { name },
        });
    }
    async getCategories() {
        return prisma_services_1.default.category.findMany({
            include: {
                products: true,
            },
        });
    }
    async disconnect() {
        await prisma_services_1.default.$disconnect();
    }
}
exports.DatabaseServices = DatabaseServices;
const databaseServices = new DatabaseServices();
exports.default = databaseServices;
