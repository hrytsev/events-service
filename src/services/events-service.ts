import {eventsInDbRepository} from "../repositories/events/events-in-db-repository";
import {ParticipantsDataType} from "../routers/events-router";
import {eventsCollection} from "../repositories/db";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";

export const eventsService = {
    addEvent: async (name: string, date: number, location: string, maxParticipants: number) => {
        const newEvent = {
            name,
            date,
            location,
            maxParticipants,
            participants: []
        }
        const result = await eventsInDbRepository.addEvent(newEvent)
        return {...newEvent, _id: result.insertedId}
    },
    registerUserByEventId: async (participantData: ParticipantsDataType, eventId: string) => {
        const event = await eventsInDbQueryRepository.getEventById(eventId)
        if (!event || !(event.maxParticipants >= event.participants.length)) {
            return null
        }
        return await eventsInDbRepository.updateEventsParticipants(participantData, eventId);
    }
}