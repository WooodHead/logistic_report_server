"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutoBrandModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../../services/prisma.service");
var autoBrand_service_1 = require("./autoBrand.service");
var autoBrand_controller_1 = require("./autoBrand.controller");
var AutoBrandModule = /** @class */ (function () {
    function AutoBrandModule() {
    }
    AutoBrandModule = __decorate([
        common_1.Module({
            controllers: [autoBrand_controller_1.AutoBrandController],
            providers: [autoBrand_service_1.AutoBrandService, prisma_service_1.PrismaService],
            exports: []
        })
    ], AutoBrandModule);
    return AutoBrandModule;
}());
exports.AutoBrandModule = AutoBrandModule;
