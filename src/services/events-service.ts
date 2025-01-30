import {eventsInDbRepository} from "../repositories/events/events-in-db-repository";

export const eventsService = {
    addEvent: async (name: string, date: number, location: string, maxParticipants: number) => {
        const newEvent = {
            name,
            date,
            location,
            maxParticipants,
        }
     const result=  await eventsInDbRepository.addEvent(newEvent)
        return {...newEvent,_id:result.insertedId}
    }
}