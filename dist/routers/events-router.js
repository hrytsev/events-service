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
exports.getEventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const events_middleware_1 = require("../middleware/events-middleware");
const events_service_1 = require("../services/events-service");
const HTTP_STATUSES_1 = require("../utils/configs/HTTP_STATUSES");
const errors_handler_1 = require("../middleware/errors-handler");
const validateParamId_1 = require("../middleware/validateParamId");
const events_in_db_query_repository_1 = require("../repositories/events/events-in-db-query-repository");
const events_in_db_repository_1 = require("../repositories/events/events-in-db-repository");
const participants_middleware_1 = require("../middleware/participants-middleware");
const removeUndefinedFieldsFormFilter_1 = require("../utils/removeUndefinedFieldsFormFilter");
const getEventsRouter = () => {
    const router = express_1.default.Router();
    router.get("/:id/participants", validateParamId_1.validateParamId, errors_handler_1.errorsHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const [page, limit] = [req.query.page, req.query.limit];
        const _id = req.params.id;
        const isPagination = !!page && !!limit;
        let registeredParticipants;
        if (isPagination && !isNaN(+page) && !isNaN(+limit))
            registeredParticipants = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEventsByParticipantsByEventIdWithPagination(_id, +page, +limit);
        else
            registeredParticipants = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEventParticipantsByEventId(_id);
        res.status(HTTP_STATUSES_1.HTTP_STATUSES.OK_200).send(registeredParticipants);
        return;
    }));
    router.post("/", events_middleware_1.validateName, events_middleware_1.validateDate, events_middleware_1.validateLocation, events_middleware_1.validateMaxParticipants, errors_handler_1.errorsHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const [name, date, location, maxParticipants] = [req.body.name, req.body.date, req.body.location, req.body.maxParticipants];
        try {
            const addedEvent = yield events_service_1.eventsService.addEvent(name, +date, location, maxParticipants);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.OK_200).send(addedEvent);
        }
        catch (err) {
            console.log(err);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.BAD_REQUEST_400).send({ error: 'Can`t add event', timestamp: new Date() }); //check later
        }
    }));
    router.get("/:id", validateParamId_1.validateParamId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _id = req.params.id;
        try {
            const event = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEventById(_id);
            if (!event) {
                res.status(HTTP_STATUSES_1.HTTP_STATUSES.NOT_FOUND_404).send({ error: ' Event not found', timestamp: new Date() }); //check later
                return;
            }
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.OK_200).send(event);
        }
        catch (err) {
            console.log(err);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.BAD_REQUEST_400).send({ error: 'Can`t get event', timestamp: new Date() }); ////check later
        }
    }));
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const [page, limit] = [req.query.page, req.query.limit];
        const filtersRaw = { name: req.query.name, date: req.query.date, location: req.query.location };
        const filters = (0, removeUndefinedFieldsFormFilter_1.RemoveUndefinedFieldsFormFilter)(filtersRaw);
        const isPagination = !!page && !!limit;
        let response;
        try {
            if (isPagination && !isNaN(+page) && !isNaN(+limit))
                response = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEventsWithPagination(+page, +limit, filters);
            else
                response = yield events_in_db_query_repository_1.eventsInDbQueryRepository.getEvents(filters);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.OK_200).send(response);
        }
        catch (err) {
            console.log(err);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).send({ error: 'Can`t add event', timestamp: new Date() }); //check later
        }
    }));
    router.delete("/:id", validateParamId_1.validateParamId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield events_in_db_repository_1.eventsInDbRepository.deleteEventById(id);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.OK_200).send({ id, timestamp: new Date() });
        }
        catch (err) {
            console.log(err);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.BAD_REQUEST_400).send({ error: 'Can`t delete event', timestamp: new Date(), id }); //check later
        }
    }));
    router.post("/:id/register", validateParamId_1.validateParamId, events_middleware_1.validateName, participants_middleware_1.validateEmail, errors_handler_1.errorsHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email } = req.body;
        const id = req.params.id;
        const participantData = {
            name,
            email,
        };
        try {
            const result = yield events_service_1.eventsService.registerUserByEventId(participantData, id);
            if (!result) {
                res.status(HTTP_STATUSES_1.HTTP_STATUSES.BAD_REQUEST_400).send({ error: "Can`t register user anymore", timestamp: new Date() }); //check later
                return;
            }
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.OK_200).send({ participantData, id });
        }
        catch (err) {
            console.log(err);
            res.status(HTTP_STATUSES_1.HTTP_STATUSES.NOT_FOUND_404).send({ error: "Can`t register user", timestamp: new Date() }); //check later
        }
    }));
    return router;
};
exports.getEventsRouter = getEventsRouter;
