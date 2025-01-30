import {EventType} from "../../types/events/event";
import {eventsCollection} from "../db";
import {ObjectId} from "mongodb";
import {eventsService} from "../../services/events-service";

export const eventsInDbQueryRepository = {
    getEventById: async (_id: string) => {
        return await eventsCollection.findOne({_id: new ObjectId(_id)});
    },
    getEvents: async () => {
        return await eventsCollection.find({}).toArray();
    },
    getEventParticipantsByEventId: async (eventId: string) => {
        const event = await eventsInDbQueryRepository.getEventById(eventId)
        return event?.participants
    },
    getEventsByParticipantsByEventIdWithPagination: async (eventId: string,page:number,limit:number) => {
            const event = await eventsInDbQueryRepository.getEventById(eventId)
            return event?.participants.slice((page-1)*limit,page*limit)
    }
}