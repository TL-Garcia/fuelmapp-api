"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
exports.server = (0, fastify_1.default)({ logger: true });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const { env: { PORT }, } = process;
    try {
        typeof PORT === 'string' && (yield exports.server.listen(PORT));
        const address = exports.server.server.address();
        const port = typeof address === 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
    }
    catch (err) {
        exports.server.log.error(err);
        process.exit(1);
    }
});
start();
