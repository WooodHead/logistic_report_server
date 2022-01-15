"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorFilter = void 0;
var common_1 = require("@nestjs/common");
var ErrorFilter = /** @class */ (function () {
    function ErrorFilter() {
        this.logger = new common_1.Logger(ErrorFilter_1.name);
    }
    ErrorFilter_1 = ErrorFilter;
    ErrorFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        var errorMsg = 'Internal server error';
        if (exception instanceof common_1.HttpException) {
            var message = exception.getResponse().message;
            message = Array.isArray(message) ? message.pop() : message;
            statusCode = exception.getStatus();
            errorMsg = message || exception.getResponse() || errorMsg;
            this.logger.error(exception.message + ". Message: " + JSON.stringify(errorMsg));
        }
        else {
            this.logger.error(exception, exception.stack);
        }
        response.status(statusCode).json({
            statusCode: statusCode,
            message: errorMsg,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    };
    var ErrorFilter_1;
    ErrorFilter = ErrorFilter_1 = __decorate([
        common_1.Catch()
    ], ErrorFilter);
    return ErrorFilter;
}());
exports.ErrorFilter = ErrorFilter;
