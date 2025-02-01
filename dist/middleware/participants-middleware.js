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
exports.validateEventId = exports.validateName = exports.validateEmail = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const events_in_db_query_repository_1 = require("../repositories/events/events-in-db-query-repository");
exports.validateEmail = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is required"),
];
exports.validateName = [
    (0, express_validator_1.body)("name").isString().withMessage("Name is required").isLength({ min: 2, max: 50 }),
];
exports.validateEventId = [
    (0, express_validator_1.body)("eventId")
        .isString()
        .withMessage("EventId is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (mongodb_1.ObjectId.isValid(value)) {
            const event = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEventById(value);
            if (!event) {
                throw new Error(`${value} is not a valid event`);
            }
            else
                return true;
        }
        else {
            throw new Error(`${value} is not a valid ObjectId`);
        }
    })),
];
