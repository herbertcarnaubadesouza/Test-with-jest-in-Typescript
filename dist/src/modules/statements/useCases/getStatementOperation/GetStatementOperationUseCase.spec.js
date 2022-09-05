"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Statement_1 = require("@modules/statements/entities/Statement");
var InMemoryStatementsRepository_1 = require("@modules/statements/repositories/in-memory/InMemoryStatementsRepository");
var InMemoryUsersRepository_1 = require("@modules/users/repositories/in-memory/InMemoryUsersRepository");
var CreateUserUseCase_1 = require("@modules/users/useCases/createUser/CreateUserUseCase");
var CreateStatementUseCase_1 = require("../createStatement/CreateStatementUseCase");
var GetStatementOperationError_1 = require("./GetStatementOperationError");
var GetStatementOperationUseCase_1 = require("./GetStatementOperationUseCase");
var getStatementOperationUseCase;
var statementsRepository;
var createStatementUseCase;
var usersRepositoryInMemory;
var createUserUseCase;
describe("Get Statement Operation", function () {
    beforeEach(function () {
        usersRepositoryInMemory = new InMemoryUsersRepository_1.InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository_1.InMemoryStatementsRepository();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
        createStatementUseCase = new CreateStatementUseCase_1.CreateStatementUseCase(usersRepositoryInMemory, statementsRepository);
        getStatementOperationUseCase = new GetStatementOperationUseCase_1.GetStatementOperationUseCase(usersRepositoryInMemory, statementsRepository);
    });
    it("should be able to get statement operation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, returnedUser, statement, returnedStatement, operation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        name: "User Test",
                        email: "user@test.com",
                        password: "1234"
                    };
                    return [4 /*yield*/, createUserUseCase.execute(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, usersRepositoryInMemory.findByEmail(user.email)];
                case 2:
                    returnedUser = _a.sent();
                    statement = {
                        user_id: returnedUser.id,
                        type: Statement_1.OperationType.DEPOSIT,
                        amount: 200,
                        description: "Description statement"
                    };
                    return [4 /*yield*/, createStatementUseCase.execute(statement)];
                case 3:
                    returnedStatement = _a.sent();
                    return [4 /*yield*/, getStatementOperationUseCase.execute({
                            user_id: returnedUser.id,
                            statement_id: returnedStatement.id
                        })];
                case 4:
                    operation = _a.sent();
                    expect(operation).toHaveProperty("id");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to get balance, if the user does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getStatementOperationUseCase.execute({
                                user_id: "fake user",
                                statement_id: "fake statement"
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).rejects.toBeInstanceOf(GetStatementOperationError_1.GetStatementOperationError.UserNotFound);
            return [2 /*return*/];
        });
    }); });
    it("should not be able to get balance, if the statement does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                var user, returnedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = {
                                name: "User Test",
                                email: "user@test.com",
                                password: "1234"
                            };
                            return [4 /*yield*/, createUserUseCase.execute(user)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, usersRepositoryInMemory.findByEmail(user.email)];
                        case 2:
                            returnedUser = _a.sent();
                            return [4 /*yield*/, getStatementOperationUseCase.execute({
                                    user_id: returnedUser.id,
                                    statement_id: "fake statement"
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).rejects.toBeInstanceOf(GetStatementOperationError_1.GetStatementOperationError.StatementNotFound);
            return [2 /*return*/];
        });
    }); });
});