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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsInDbQueryRepository = void 0;
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
exports.eventsInDbQueryRepository = {
    getEventById: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.eventsCollection.findOne({ _id: new mongodb_1.ObjectId(_id) });
    }),
    getEvents: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) {
        return yield db_1.eventsCollection.find(filter).toArray();
    }),
    getEventsWithPagination: (page_1, limit_1, ...args_1) => __awaiter(void 0, [page_1, limit_1, ...args_1], void 0, function* (page, limit, filters = {}) {
        const data = yield db_1.eventsCollection.find(filters).skip((page - 1) * limit).limit(limit).toArray();
        const totalPages = Math.ceil((yield db_1.eventsCollection.countDocuments({})) / limit);
        return {
            data,
            totalPages,
            page,
            limit,
        };
    }),
    getEventParticipantsByEventId: (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield exports.eventsInDbQueryRepository.getEventById(eventId);
        return event === null || event === void 0 ? void 0 : event.participants;
    }),
    getEventsByParticipantsByEventIdWithPagination: (eventId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield exports.eventsInDbQueryRepository.getEventById(eventId);
        const data = event === null || event === void 0 ? void 0 : event.participants.slice((page - 1) * limit, page * limit);
        const totalPages = (event === null || event === void 0 ? void 0 : event.participants) ? Math.ceil((event === null || event === void 0 ? void 0 : event.participants.length) / limit) : 0;
        return {
            data,
            totalPages,
            page,
            limit,
        };
    })
};
