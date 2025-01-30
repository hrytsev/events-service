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
    getEventsWithPagination: async (page: number, limit: number) => {
        const data = await eventsCollection.find({}).skip((page - 1) * limit).limit(limit).toArray();
        const totalPages = Math.ceil(await eventsCollection.countDocuments({}) / limit)
        return {
            data,
            totalPages,
            page,
            limit,
        }
    },
    getEventParticipantsByEventId: async (eventId: string) => {
        const event = await eventsInDbQueryRepository.getEventById(eventId)
        return event?.participants
    },
    getEventsByParticipantsByEventIdWithPagination: async (eventId: string, page: number, limit: number) => {
        const event = await eventsInDbQueryRepository.getEventById(eventId)
        const data = event?.participants.slice((page - 1) * limit, page * limit)
        const totalPages = event?.participants ? Math.ceil(event?.participants.length / limit):0
        return {
            data,
            totalPages,
            page,
            limit,
        }
    }
}