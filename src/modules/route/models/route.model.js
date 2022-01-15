"use strict";
exports.__esModule = true;
exports.RouteModel = void 0;
var RouteModel = /** @class */ (function () {
    function RouteModel() {
    }
    RouteModel.createOrConnect = function (route) {
        if (!route) {
            return {};
        }
        return {
            connectOrCreate: {
                create: route,
                where: { id: route.id || 0 }
            }
        };
    };
    RouteModel.connect = function (route) {
        if (!route) {
            return {};
        }
        return {
            connect: { id: route.id }
        };
    };
    return RouteModel;
}());
exports.RouteModel = RouteModel;
