"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = exports.OperationType = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var User_1 = require("../../users/entities/User");
var OperationType;
(function (OperationType) {
    OperationType["DEPOSIT"] = "deposit";
    OperationType["WITHDRAW"] = "withdraw";
    OperationType["TRANSFER"] = "transfer";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
var Statement = /** @class */ (function () {
    function Statement() {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Statement.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('uuid'),
        __metadata("design:type", String)
    ], Statement.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.statement; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", User_1.User)
    ], Statement.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Statement.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column('decimal', { precision: 5, scale: 2 }),
        __metadata("design:type", Number)
    ], Statement.prototype, "amount", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: OperationType }),
        __metadata("design:type", String)
    ], Statement.prototype, "type", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Statement.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Statement.prototype, "updated_at", void 0);
    Statement = __decorate([
        typeorm_1.Entity('statements'),
        __metadata("design:paramtypes", [])
    ], Statement);
    return Statement;
}());
exports.Statement = Statement;
