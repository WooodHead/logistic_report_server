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
exports.__esModule = true;
exports.AutoBrandModel = void 0;
var AutoBrandModel = /** @class */ (function () {
    function AutoBrandModel() {
    }
    AutoBrandModel.update = function (autoBrand) {
        if (!autoBrand) {
            return;
        }
        return {
            update: autoBrand
        };
    };
    AutoBrandModel.createOrConnect = function (autoBrand, userId) {
        if (!autoBrand) {
            return;
        }
        return {
            connectOrCreate: {
                create: __assign(__assign({}, autoBrand), { userId: userId }),
                where: { id: autoBrand.id || 0 }
            }
        };
    };
    return AutoBrandModel;
}());
exports.AutoBrandModel = AutoBrandModel;
