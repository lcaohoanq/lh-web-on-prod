"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importStar(require("express"));
const users_routers_1 = __importDefault(require("./routes/users.routers"));
const database_services_1 = __importDefault(require("./services/database.services"));
const messages_1 = require("./constants/messages");
const products_routers_1 = __importDefault(require("./routes/products.routers"));
const categories_routers_1 = __importDefault(require("./routes/categories.routers"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const auth_routers_1 = __importDefault(require("./routes/auth.routers"));
const open_1 = __importDefault(require("open"));
(0, dotenv_1.config)({ path: __dirname + '/../.env' });
const app = (0, express_1.default)();
const port = process.env.PORT ?? 5173;
// use middleware to parse json
const jsonParseMiddleware = (0, express_1.json)();
app.use(jsonParseMiddleware);
// Enable CORS for all routes
app.use((0, cors_1.default)());
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
database_services_1.default
    .connect()
    .then(() => {
    console.log(messages_1.DATABASE_MESSAGE.CONNECT_SUCCESS);
})
    .catch((error) => {
    console.error(messages_1.DATABASE_MESSAGE.CONNECT_FAILED);
    console.error(error);
});
app.use('/api/users', users_routers_1.default);
app.use('/api/products', products_routers_1.default);
app.use('/api/categories', categories_routers_1.default);
app.use('/api/auth', auth_routers_1.default);
// this is for logging
app.all('*', (req, res, next) => {
    console.log('Time', Date.now());
    // console.log(req);
    next();
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    });
});
// Protected route example
app.get('/protected', auth_middleware_1.authMiddleware, (req, res) => {
    // Access user ID with req.user.userId
    res.json({ message: 'Protected route' });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    // Perform the async operation separately
    (0, open_1.default)('http://localhost:4000/api-docs')
        .then(() => console.log('Swagger docs opened successfully'))
        .catch((err) => console.error('Failed to open Swagger docs:', err));
});
