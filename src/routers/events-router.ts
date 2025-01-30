import express, {Errback, Request, Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types/requestTypes";
import {validateDate, validateLocation, validateMaxParticipants, validateName} from "../middleware/events-middleware";
import {EventInputModel} from "../models/events/events-input-models";
import {eventsService} from "../services/events-service";
import {HTTP_STATUSES} from "../utils/configs/HTTP_STATUSES";
import {errorsHandler} from "../middleware/errors-handler";
import {EventType} from "../types/events/event";
import {validateId} from "../middleware/validateId";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";
import {WithId} from "mongodb";
import {eventsInDbRepository} from "../repositories/events/events-in-db-repository";
import {validateEmail, validateEventId} from "../middleware/users-middleware";
import e from "express";

export type FilterObjectType = {}
// export type EventsQueryInputModel = {
//     name?: string, location?: string, date?: number, page?: number, limit?: number, filterObject?: {}
// }
export type RegisterUserInputModel = {
    name: string,
    email: string,
    eventId: string,
}
export type ParticipantsDataType = {
    name: string,
    email: string,
}
export const getEventsRouter = () => {
    const router = express.Router();
    router.post("/", validateName, validateDate, validateLocation, validateMaxParticipants, errorsHandler, async (req: RequestWithBody<EventInputModel>, res: Response<EventType | any>) => {
        const [name, date, location, maxParticipants] = [req.body.name, req.body.date, req.body.location, req.body.maxParticipants];
        try {
            const addedEvent: EventType = await eventsService.addEvent(name, date, location, maxParticipants);
            res.status(HTTP_STATUSES.OK_200).send(addedEvent)
        } catch (err) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: err});//errors handling
        }
    })
    router.get("/:_id", validateId, async (req: RequestWithParams<{ _id: string }>, res: Response<EventType | any>) => {
        const _id = req.params._id;
        console.log(_id)
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

        const events = await eventsInDbQueryRepository.getEvents()
        if (!events.length) {
            res.status(HTTP_STATUSES.NO_CONTENT_204).send({error: 'Not found '});
            return
        }
        res.status(HTTP_STATUSES.OK_200).send(events)
    })
    router.delete("/:_id", validateId, async (req: RequestWithParams<{
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
    router.post("/register_user", validateName, validateEventId, validateEmail, errorsHandler, async (req: RequestWithBody<RegisterUserInputModel>, res: Response) => {
        const {name, email, eventId} = req.body;
        const participantData: ParticipantsDataType = {
            name,
            email,
        }
        try {
         const result=   await eventsService.registerUserByEventId(participantData, eventId)
            if(!result){
                res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: "Can`t register user anymore"});//handle error
                return
            }
            res.status(HTTP_STATUSES.OK_200).send({participantData, eventId});
        } catch (err) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: err});//handle error
        }

    })
    return router;
}