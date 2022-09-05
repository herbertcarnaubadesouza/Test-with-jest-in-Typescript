"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("../modules/users/useCases/createUser/CreateUserController");
var usersRouter = express_1.Router();
exports.usersRouter = usersRouter;
var createUserController = new CreateUserController_1.CreateUserController();
usersRouter.post('/', createUserController.execute);
