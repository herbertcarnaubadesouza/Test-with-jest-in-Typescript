"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
var express_1 = require("express");
var AuthenticateUserController_1 = require("../modules/users/useCases/authenticateUser/AuthenticateUserController");
var authenticationRouter = express_1.Router();
exports.authenticationRouter = authenticationRouter;
var authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
authenticationRouter.post('/sessions', authenticateUserController.execute);
