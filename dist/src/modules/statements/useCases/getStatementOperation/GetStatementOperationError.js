"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStatementOperationError = void 0;
var AppError_1 = require("../../../../shared/errors/AppError");
var GetStatementOperationError;
(function (GetStatementOperationError) {
    var UserNotFound = /** @class */ (function (_super) {
        __extends(UserNotFound, _super);
        function UserNotFound() {
            return _super.call(this, 'User not found', 404) || this;
        }
        return UserNotFound;
    }(AppError_1.AppError));
    GetStatementOperationError.UserNotFound = UserNotFound;
    var StatementNotFound = /** @class */ (function (_super) {
        __extends(StatementNotFound, _super);
        function StatementNotFound() {
            return _super.call(this, 'Statement not found', 404) || this;
        }
        return StatementNotFound;
    }(AppError_1.AppError));
    GetStatementOperationError.StatementNotFound = StatementNotFound;
})(GetStatementOperationError = exports.GetStatementOperationError || (exports.GetStatementOperationError = {}));
