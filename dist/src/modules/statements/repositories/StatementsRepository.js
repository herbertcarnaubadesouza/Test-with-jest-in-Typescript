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
exports.StatementsRepository = void 0;
var typeorm_1 = require("typeorm");
var Statement_1 = require("../entities/Statement");
var StatementsRepository = /** @class */ (function () {
    function StatementsRepository() {
        this.repository = typeorm_1.getRepository(Statement_1.Statement);
    }
    StatementsRepository.prototype.create = function (_a) {
        var user_id = _a.user_id, amount = _a.amount, description = _a.description, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var statement;
            return __generator(this, function (_b) {
                statement = this.repository.create({
                    user_id: user_id,
                    amount: amount,
                    description: description,
                    type: type
                });
                return [2 /*return*/, this.repository.save(statement)];
            });
        });
    };
    StatementsRepository.prototype.createTransferOperation = function (_a) {
        var sender_id = _a.sender_id, amount = _a.amount, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var transferOperation;
            return __generator(this, function (_b) {
                transferOperation = this.repository.create({ user_id: sender_id, amount: amount, description: description, type: Statement_1.OperationType.TRANSFER });
                return [2 /*return*/, this.repository.save(transferOperation)];
            });
        });
    };
    StatementsRepository.prototype.findStatementOperation = function (_a) {
        var statement_id = _a.statement_id, user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.repository.findOne(statement_id, {
                        where: { user_id: user_id }
                    })];
            });
        });
    };
    StatementsRepository.prototype.getUserBalance = function (_a) {
        var user_id = _a.user_id, _b = _a.with_statement, with_statement = _b === void 0 ? false : _b;
        return __awaiter(this, void 0, void 0, function () {
            var statement, balance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.repository.find({
                            where: { user_id: user_id }
                        })];
                    case 1:
                        statement = _c.sent();
                        balance = statement.reduce(function (acc, operation) {
                            if (operation.type === 'deposit') {
                                return acc + operation.amount;
                            }
                            else {
                                return acc - operation.amount;
                            }
                        }, 0);
                        if (with_statement) {
                            return [2 /*return*/, {
                                    statement: statement,
                                    balance: balance
                                }];
                        }
                        return [2 /*return*/, { balance: balance }];
                }
            });
        });
    };
    return StatementsRepository;
}());
exports.StatementsRepository = StatementsRepository;
