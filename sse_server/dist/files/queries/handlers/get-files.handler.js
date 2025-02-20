"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const get_files_query_1 = require("../get-files.query");
let GetFilesHandler = class GetFilesHandler {
    async execute(query) {
        const { userId } = query;
        return [`UserId : ${userId}`];
    }
};
exports.GetFilesHandler = GetFilesHandler;
exports.GetFilesHandler = GetFilesHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_files_query_1.GetFilesQuery)
], GetFilesHandler);
//# sourceMappingURL=get-files.handler.js.map