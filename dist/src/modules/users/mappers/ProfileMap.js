"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileMap = void 0;
var ProfileMap = /** @class */ (function () {
    function ProfileMap() {
    }
    ProfileMap.toDTO = function (_a) {
        var id = _a.id, name = _a.name, email = _a.email, created_at = _a.created_at, updated_at = _a.updated_at;
        return {
            id: id,
            name: name,
            email: email,
            created_at: created_at,
            updated_at: updated_at
        };
    };
    return ProfileMap;
}());
exports.ProfileMap = ProfileMap;
