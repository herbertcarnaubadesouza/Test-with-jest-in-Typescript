"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
typeorm_1.getConnectionOptions().then(function (options) {
    var newOptions = options;
    newOptions.host = 'database'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    typeorm_1.createConnection(__assign({}, options));
});
