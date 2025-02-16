"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchPasswordAndConfirmPassword = exports.getMeController = void 0;
const dotenv_1 = require("dotenv");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const database_services_1 = __importDefault(require("../services/database.services"));
(0, dotenv_1.config)();
const getMeController = async (req, res) => {
    try {
        const { username } = req.query;
        console.log(username);
        const user = await database_services_1.default.findUserByUsername(username);
        if (!user) {
            return res.status(httpStatus_1.default.BAD_REQUEST).json({ message: messages_1.USERS_MESSAGE.USER_NOT_FOUND });
        }
        return res.status(httpStatus_1.default.OK).json({
            data: user,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: messages_1.ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
};
exports.getMeController = getMeController;
// export const loginController = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body as LoginReqBody;
//     const user = await databaseServices.findUserByUsername(username);
//     if (!user) {
//       return res.status(400).json({ message: USERS_MESSAGE.USER_NOT_FOUND });
//     }
//     const question = isUserHaveSalt(user);
//     if (question) {
//       const hashedPassword = generateHash(password, user.salt);
//       if (user.password !== hashedPassword) {
//         return res.status(400).json({ message: USERS_MESSAGE.WRONG_USERNAME_OR_PASSWORD });
//       }
//     } else {
//       if (user.password !== password) {
//         return res.status(400).json({ message: USERS_MESSAGE.WRONG_USERNAME_OR_PASSWORD });
//       }
//     }
//     return res.status(HTTP_STATUS.OK).json({
//       message: USERS_MESSAGE.LOGIN_SUCCESS,
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message);
//       return res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
//     }
//   }
// };
// export const registerController = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body as RegisterReqBody;
//     const salt = generateSalt();
//     const hashedPassword = generateHash(password, salt);
//     console.log(`username ${username}`);
//     console.log(`password ${password}`);
//     const account = await databaseServices.register({ username, password: hashedPassword, salt });
//     return res.json({
//       message: USERS_MESSAGE.REGISTER_SUCCESS,
//       data: account,
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message); // Now you can access err.message safely
//       if (err.message === USERS_MESSAGE.ACCOUNT_EXISTS) {
//         return res.status(HTTP_STATUS.BAD_REQUEST).json({
//           message: USERS_MESSAGE.ACCOUNT_EXISTS,
//         });
//       }
//     }
//     // For any other error, send a 500 response
//     return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
//       message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//     });
//   }
// };
const isMatchPasswordAndConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};
exports.isMatchPasswordAndConfirmPassword = isMatchPasswordAndConfirmPassword;
const isUserHaveSalt = (user) => {
    return user.salt !== undefined;
};
