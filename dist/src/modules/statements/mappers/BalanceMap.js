"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceMap = void 0;
var BalanceMap = /** @class */ (function () {
    function BalanceMap() {
    }
    BalanceMap.toDTO = function (_a) {
        var statement = _a.statement, balance = _a.balance;
        var parsedStatement = statement.map(function (_a) {
            var id = _a.id, amount = _a.amount, description = _a.description, type = _a.type, created_at = _a.created_at, updated_at = _a.updated_at;
            return ({
                id: id,
                amount: Number(amount),
                description: description,
                type: type,
                created_at: created_at,
                updated_at: updated_at
            });
        });
        return {
            statement: parsedStatement,
            balance: Number(balance)
        };
    };
    return BalanceMap;
}());
exports.BalanceMap = BalanceMap;
