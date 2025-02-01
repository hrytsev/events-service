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
exports.useDb = exports.eventsCollection = void 0;
const mongodb_1 = require("mongodb");
const login = process.env.LOGIN || 'login';
const password = process.env.PASSWORD || 'password';
const mongoUrl = `mongodb://${login}:${password}@localhost:27017/eventService?authSource=admin`;
const client = new mongodb_1.MongoClient(mongoUrl);
const coursesDb = client.db("eventsService");
exports.eventsCollection = coursesDb.collection("events");
const useDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.db('events_service').command({ ping: 1 });
        console.log("Events db connected");
    }
    catch (error) {
        yield client.close();
    }
});
exports.useDb = useDb;
