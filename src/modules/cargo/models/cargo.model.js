"use strict";
exports.__esModule = true;
exports.CargoModel = void 0;
var CargoModel = /** @class */ (function () {
    function CargoModel() {
    }
    CargoModel.createOrConnect = function (cargo) {
        if (!cargo) {
            return {};
        }
        return {
            connectOrCreate: {
                create: cargo,
                where: { id: cargo.id || 0 }
            }
        };
    };
    CargoModel.connect = function (cargo) {
        if (!cargo) {
            return {};
        }
        return {
            connect: { id: cargo.id }
        };
    };
    return CargoModel;
}());
exports.CargoModel = CargoModel;
