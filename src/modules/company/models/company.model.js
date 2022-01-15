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
exports.CompanyModel = void 0;
var CompanyModel = /** @class */ (function () {
    function CompanyModel() {
    }
    CompanyModel.update = function (company, userId) {
        if (!company) {
            return;
        }
        return {
            update: __assign(__assign({}, company), { userId: userId })
        };
    };
    CompanyModel.connect = function (company) {
        if (!company) {
            return {};
        }
        return {
            connect: { id: company.id }
        };
    };
    CompanyModel.createOrConnect = function (company, userId) {
        if (!company) {
            return;
        }
        return {
            connectOrCreate: {
                create: __assign(__assign({}, company), { userId: userId }),
                where: { id: company.id || 0 }
            }
        };
    };
    return CompanyModel;
}());
exports.CompanyModel = CompanyModel;
