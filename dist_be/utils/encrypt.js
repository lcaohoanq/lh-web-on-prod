"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSalt = generateSalt;
exports.generateHash = generateHash;
const crypto_1 = require("crypto");
function generateSalt() {
    return (0, crypto_1.randomBytes)(16).toString('hex');
}
function generateHash(password, salt) {
    return (0, crypto_1.pbkdf2Sync)(password, salt, 1, 32, 'sha512').toString('hex');
}
