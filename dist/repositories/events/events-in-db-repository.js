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
exports.eventsInDbRepository = void 0;
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
exports.eventsInDbRepository = {
    addEvent: (event) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.eventsCollection.insertOne(event);
    }),
    deleteEventById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.eventsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    }),
    updateEventsParticipants: (newParticipant, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.eventsCollection.updateOne({ _id: new mongodb_1.ObjectId(eventId) }, { $push: { participants: newParticipant } });
    })
};
