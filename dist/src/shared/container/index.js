"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var UsersRepository_1 = require("../../modules/users/repositories/UsersRepository");
var StatementsRepository_1 = require("../../modules/statements/repositories/StatementsRepository");
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton('StatementsRepository', StatementsRepository_1.StatementsRepository);
