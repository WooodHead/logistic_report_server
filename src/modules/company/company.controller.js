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
exports.CompanyController = void 0;
var common_1 = require("@nestjs/common");
// @UseGuards(AuthGuard('jwt'))
var CompanyController = /** @class */ (function () {
    function CompanyController(companyService) {
        this.companyService = companyService;
    }
    CompanyController.prototype.index = function (req, cargoOwner) {
        return this.companyService.companies({
            where: {
                isCargoOwner: cargoOwner,
                userId: req.user.id
            }
        });
    };
    __decorate([
        common_1.Get('companies'),
        __param(0, common_1.Req()),
        __param(1, common_1.Query('cargoOwner', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe))
    ], CompanyController.prototype, "index");
    CompanyController = __decorate([
        common_1.Controller()
    ], CompanyController);
    return CompanyController;
}());
exports.CompanyController = CompanyController;
