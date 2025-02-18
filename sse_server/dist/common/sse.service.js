"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseService = void 0;
const common_1 = require("@nestjs/common");
let SseService = class SseService {
    constructor() {
        this.clients = {};
        this.nextUserId = 1;
    }
    addClient(res) {
        const userId = this.nextUserId++;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        if (!this.clients[userId]) {
            this.clients[userId] = [];
        }
        this.clients[userId].push(res);
        res.write(`data: ${JSON.stringify({ userId })}\n\n`);
        res.on('close', () => this.removeClient(userId, res));
        return userId;
    }
    removeClient(userId, res) {
        this.clients[userId] = this.clients[userId].filter(client => client !== res);
        if (this.clients[userId].length === 0) {
            delete this.clients[userId];
        }
    }
    sendMessage(userId, message) {
        if (this.clients[userId]) {
            this.clients[userId].forEach(client => client.write(`data: ${JSON.stringify({ message })}\n\n`));
        }
    }
};
exports.SseService = SseService;
exports.SseService = SseService = __decorate([
    (0, common_1.Injectable)()
], SseService);
//# sourceMappingURL=sse.service.js.map