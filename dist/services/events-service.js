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
exports.eventsService = void 0;
const events_in_db_repository_1 = require("../repositories/events/events-in-db-repository");
const events_in_db_query_repository_1 = require("../repositories/events/events-in-db-query-repository");
const mailNotifier_adapter_1 = require("../adapters/mailNotifier-adapter");
const mailsHTMLGenerators_1 = require("../utils/mailsHTMLGenerators");
exports.eventsService = {
    addEvent: (name, date, location, maxParticipants) => __awaiter(void 0, void 0, void 0, function* () {
        const newEvent = {
            name,
            date,
            location,
            maxParticipants,
            participants: []
        };
        const result = yield events_in_db_repository_1.eventsInDbRepository.addEvent(newEvent);
        return Object.assign(Object.assign({}, newEvent), { _id: result.insertedId });
    }),
    registerUserByEventId: (participantData, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEventById(eventId);
        if (event) {
            const eventParticipants = event.participants;
            const isAlreadyRegistered = eventParticipants.find((cur) => cur.email === participantData.email);
            if (isAlreadyRegistered) {
                return null;
            }
        }
        if (!event || !(event.maxParticipants >= event.participants.length)) {
            return null;
        }
        try {
            yield mailNotifier_adapter_1.mailNotifierAdapter.sendEmailNotification(participantData.email, `${event.name} event registration`, (0, mailsHTMLGenerators_1.generateEventRegistrationHtml)(participantData.name, event.location, event.date));
            return yield events_in_db_repository_1.eventsInDbRepository.updateEventsParticipants(participantData, eventId);
        }
        catch (err) {
            throw err;
        }
    }),
};
