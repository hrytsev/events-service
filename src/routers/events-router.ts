import express, {Request, response, Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    RequestWithQueryAndParams
} from "../types/requestTypes";
import {validateDate, validateLocation, validateMaxParticipants, validateName} from "../middleware/events-middleware";
import {EventInputModel} from "../models/events/events-input-models";
import {eventsService} from "../services/events-service";
import {HTTP_STATUSES} from "../utils/configs/HTTP_STATUSES";
import {errorsHandler} from "../middleware/errors-handler";
import {EventFilters, EventType} from "../types/events/event";
import {validateParamId} from "../middleware/validateParamId";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";
import {WithId} from "mongodb";
import {eventsInDbRepository} from "../repositories/events/events-in-db-repository";
import {validateEmail} from "../middleware/participants-middleware";
import {RegisterParticipantInputModel} from "../models/events/paricipants-input-models";
import {Pagination} from "../types/pagination";
import {ID} from "../types/ID";
import {RemoveUndefinedFieldsFormFilter} from "../utils/removeUndefinedFieldsFormFilter";
import {ErrorType} from "../types/ErrorType";
import {ParticipantsViewModel} from "../models/events/participants-view-model";
import {ParticipantType} from "../types/events/participants";

export const getEventsRouter = () => {
    const router = express.Router();
    router.get("/:id/participants", validateParamId, errorsHandler, async (req: RequestWithQueryAndParams<Pagination, ID>, res: Response) => {
        const [page, limit] = [req.query.page, req.query.limit];
        const _id = req.params.id
        const isPagination = !!page && !!limit
        let registeredParticipants
        if (isPagination && !isNaN(+page) && !isNaN(+limit))
            registeredParticipants = await eventsInDbQueryRepository.getEventsByParticipantsByEventIdWithPagination(_id, +page, +limit)
        else
            registeredParticipants = await eventsInDbQueryRepository.getEventParticipantsByEventId(_id)

        res.status(HTTP_STATUSES.OK_200).send(registeredParticipants);
        return
    })
    router.post("/", validateName, validateDate, validateLocation, validateMaxParticipants, errorsHandler, async (req: RequestWithBody<EventInputModel>, res: Response<EventType | ErrorType>) => {
        const [name, date, location, maxParticipants] = [req.body.name, req.body.date, req.body.location, req.body.maxParticipants];
        try {
            const addedEvent: EventType = await eventsService.addEvent(name, +date, location, maxParticipants);
            res.status(HTTP_STATUSES.OK_200).send(addedEvent)
        } catch (err) {
            console.log(err)
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: 'Can`t add event',timestamp:new Date()});//check later
        }
    })
    router.get("/:id", validateParamId, async (req: RequestWithParams<{
        id: string
    }>, res: Response<EventType | ErrorType>) => {
        const _id = req.params.id;
        try {
            const event: WithId<EventType> | null = await eventsInDbQueryRepository.getEventById(_id)
            if (!event) {
                res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: ' Event not found',timestamp:new Date()});//check later
                return
            }
            res.status(HTTP_STATUSES.OK_200).send(event)
        } catch (err) {
            console.log(err)
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: 'Can`t get event',timestamp:new Date()});////check later
        }
    })
    router.get("/", async (req: RequestWithQuery<Pagination & EventFilters>, res: Response<EventType[]|ErrorType>) => {
        const [page, limit] = [req.query.page, req.query.limit];
        const filtersRaw :EventFilters= { name: req.query.name ,  date: req.query.date ,  location: req.query.location }
        const filters =RemoveUndefinedFieldsFormFilter(filtersRaw)
        const isPagination = !!page && !!limit
        let response
        try{
        if (isPagination && !isNaN(+page) && !isNaN(+limit))
            response = await eventsInDbQueryRepository.getEventsWithPagination(+page, +limit,filters)
        else
            response = await eventsInDbQueryRepository.getEvents(filters)

        res.status(HTTP_STATUSES.OK_200).send(response as EventType[])}
        catch(err){
            console.log(err)
            res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).send({error: 'Can`t add event',timestamp:new Date()});//check later
        }
    })
    router.delete("/:id", validateParamId, async (req: RequestWithParams<ID>, res: Response< ID| ErrorType>) => {
        const id = req.params.id;
        try {
            await eventsInDbRepository.deleteEventById(id)
            res.status(HTTP_STATUSES.OK_200).send({id, timestamp: new Date()});
        } catch (err) {
            console.log(err)
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: 'Can`t delete event',timestamp:new Date(),id});//check later
        }

    })
    router.post("/:id/register", validateParamId, validateName, validateEmail, errorsHandler, async (req: RequestWithParamsAndBody<{
        id: string
    }, RegisterParticipantInputModel>, res: Response<ErrorType|ParticipantsViewModel>) => {
        const {name, email} = req.body;
        const id = req.params.id
        const participantData: ParticipantType = {
            name,
            email,
        }
        try {
            const result = await eventsService.registerUserByEventId(participantData, id)
            if (!result) {
                res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: "Can`t register user anymore",timestamp:new Date()});//check later
                return
            }
            res.status(HTTP_STATUSES.OK_200).send({participantData, id});
        } catch (err) {
            console.log(err)
            res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: "Can`t register user",timestamp:new Date()});//check later
        }

    })

    return router;
}