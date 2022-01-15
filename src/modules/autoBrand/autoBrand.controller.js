"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AutoBrandController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var AutoBrandController = /** @class */ (function () {
    function AutoBrandController(autoBrandService) {
        this.autoBrandService = autoBrandService;
    }
    AutoBrandController.prototype.index = function (req) {
        return this.autoBrandService.autoBrands({
            where: {
                OR: [{ userId: req.user.id }, { isDefault: true }]
            }
        });
    };
    __decorate([
        common_1.Get('auto-brands'),
        __param(0, common_1.Req())
    ], AutoBrandController.prototype, "index");
    AutoBrandController = __decorate([
        common_1.UseGuards(passport_1.AuthGuard('jwt')),
        common_1.Controller()
    ], AutoBrandController);
    return AutoBrandController;
}());
exports.AutoBrandController = AutoBrandController;
