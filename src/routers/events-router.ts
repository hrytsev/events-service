import express, {Errback, Request, Response} from "express";
import {RequestWithBody, RequestWithParams} from "../types/requestTypes";
import {validateDate, validateLocation, validateMaxParticipants, validateName} from "../middleware/events-middleware";
import {EventInputModel} from "../models/events/events-input-models";
import {eventsService} from "../services/events-service";
import {HTTP_STATUSES} from "../utils/configs/HTTP_STATUSES";
import {errorsHandler} from "../middleware/errors-handler";
import {EventType} from "../types/events/event";
import {validateId} from "../middleware/validateId";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";
import {WithId} from "mongodb";


export const getEventsRouter = () => {
    const router = express.Router();
    router.post("/", validateName, validateDate, validateLocation, validateMaxParticipants, errorsHandler, async (req: RequestWithBody<EventInputModel>, res: Response<EventType|any>) => {
        const [name, date, location, maxParticipants] = [req.body.name, req.body.date, req.body.location, req.body.maxParticipants];
        try {
            const addedEvent: EventType = await eventsService.addEvent(name, date, location, maxParticipants);
            res.status(HTTP_STATUSES.OK_200).send(addedEvent)
        } catch (err) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: err});
        }
    })
    router.get("/:_id", validateId, async (req: RequestWithParams<{ _id: string }>, res: Response<EventType|any>) => {
        const _id = req.params._id;
        console.log(_id)
        try {
            const event: WithId<EventType> | null = await eventsInDbQueryRepository.getEventById(_id)
            if (!event) {
                res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: 'Not found'});
                return
            }
            res.status(HTTP_STATUSES.OK_200).send(event)
        } catch (err) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: err});
        }
    })
    return router;
}