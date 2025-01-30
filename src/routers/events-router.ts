import express, {Request, response, Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../types/requestTypes";
import {validateDate, validateLocation, validateMaxParticipants, validateName} from "../middleware/events-middleware";
import {EventInputModel} from "../models/events/events-input-models";
import {eventsService} from "../services/events-service";
import {HTTP_STATUSES} from "../utils/configs/HTTP_STATUSES";
import {errorsHandler} from "../middleware/errors-handler";
import {EventType} from "../types/events/event";
import {validateParamId} from "../middleware/validateParamId";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";
import {WithId} from "mongodb";
import {eventsInDbRepository} from "../repositories/events/events-in-db-repository";
import {validateEmail} from "../middleware/participants-middleware";
import {RegisterParticipantInputModel} from "../models/events/paricipants-input-models";
import {ParticipantsDataType, ParticipantType} from "../types/events/participants";


export const getEventsRouter = () => {
    const router = express.Router();
    router.get("/:id/participants", validateParamId, errorsHandler, async (req: RequestWithParams<{
        id: string
    }>, res: Response) => {
        const [page, limit] = [req.query.page, req.query.limit];
        const _id = req.params.id
        const isPagination = !!page && !!limit
        let registeredParticipants
        if (isPagination)
            registeredParticipants = await eventsInDbQueryRepository.getEventsByParticipantsByEventIdWithPagination(_id, +page, +limit)
        else
            registeredParticipants = await eventsInDbQueryRepository.getEventParticipantsByEventId(_id)

        res.status(HTTP_STATUSES.OK_200).send(registeredParticipants);
        return
    })
    router.post("/", validateName, validateDate, validateLocation, validateMaxParticipants, errorsHandler, async (req: RequestWithBody<EventInputModel>, res: Response<EventType | any>) => {
        const [name, date, location, maxParticipants] = [req.body.name, req.body.date, req.body.location, req.body.maxParticipants];
        try {
            const addedEvent: EventType = await eventsService.addEvent(name, +date, location, maxParticipants);
            res.status(HTTP_STATUSES.OK_200).send(addedEvent)
        } catch (err) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: err});//errors handling
        }
    })
    router.get("/:id", validateParamId, async (req: RequestWithParams<{
        id: string
    }>, res: Response<EventType | any>) => {
        const _id = req.params.id;
        try {
            const event: WithId<EventType> | null = await eventsInDbQueryRepository.getEventById(_id)
            if (!event) {
                res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: 'Not found'});//errors handling
                return
            }
            res.status(HTTP_STATUSES.OK_200).send(event)
        } catch (err) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: err});//errors handling
        }
    })
    router.get("/", async (req: Request, res: Response) => {
        const [page, limit] = [req.query.page, req.query.limit];
        const isPagination = !!page && !!limit
        let response
        if (isPagination)
            response =await eventsInDbQueryRepository.getEventsWithPagination(+page, +limit)
        else
            response = await eventsInDbQueryRepository.getEvents()
        res.status(HTTP_STATUSES.OK_200).send(response)
    })
    router.delete("/:_id", validateParamId, async (req: RequestWithParams<{
        _id: string
    }>, res: Response<EventType | any>) => {
        const _id = req.params._id;
        try {
            await eventsInDbRepository.deleteEventById(_id)
            res.status(HTTP_STATUSES.OK_200).send({_id, timestamp: new Date()});//response set type
        } catch (err) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: err});//errors handling
        }

    })
    router.post("/:id/register", validateParamId, validateName, validateEmail, errorsHandler, async (req: RequestWithParamsAndBody<{
        id: string
    }, RegisterParticipantInputModel>, res: Response) => {
        const {name, email} = req.body;
        const eventId = req.params.id
        const participantData: ParticipantsDataType = {
            name,
            email,
        }
        try {
            const result = await eventsService.registerUserByEventId(participantData, eventId)
            if (!result) {
                res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: "Can`t register user anymore"});//handle error
                return
            }
            res.status(HTTP_STATUSES.OK_200).send({participantData, eventId});
        } catch (err) {
            console.log(err)
            res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: err});//handle error
        }

    })

    return router;
}