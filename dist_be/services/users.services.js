"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_services_1 = __importDefault(require("./database.services"));
class UserService {
    async findAll() {
        try {
            return await database_services_1.default.findAllUsers();
        }
        catch {
            console.log('Error in finding all users');
        }
    }
    async findById(id) {
        try {
            return await database_services_1.default.findUserById(id);
        }
        catch {
            console.log('Error in finding user by id');
        }
    }
}
const userService = new UserService();
exports.default = userService;
