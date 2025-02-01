"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookieParser = require('cookie-parser');
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const events_router_1 = require("./routers/events-router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(cookieParser());
const addRoutes = () => {
    const eventsRouter = (0, events_router_1.getEventsRouter)();
    exports.app.use('/events', eventsRouter);
};
addRoutes();
