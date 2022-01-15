"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutoCreateDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var auto_brand_dto_1 = require("../../autoBrand/models/auto-brand.dto");
var AutoCreateDto = /** @class */ (function () {
    function AutoCreateDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty()
    ], AutoCreateDto.prototype, "autoNum");
    __decorate([
        class_validator_1.ValidateNested({ each: true }),
        class_transformer_1.Type(function () { return auto_brand_dto_1.AutoBrandDto; })
    ], AutoCreateDto.prototype, "autoBrand");
    return AutoCreateDto;
}());
exports.AutoCreateDto = AutoCreateDto;
