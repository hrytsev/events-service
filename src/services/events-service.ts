import {eventsInDbRepository} from "../repositories/events/events-in-db-repository";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";
import {mailNotifierAdapter} from "../adapters/mailNotifier-adapter";
import {generateEventRegistrationHtml} from "../utils/mailsHTMLGenerators";
import {ParticipantType} from "../types/events/participants";

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
    registerUserByEventId: async (participantData: ParticipantType, eventId: string) => {
        const event = await eventsInDbQueryRepository.getEventById(eventId)
        if (event) {
            const eventParticipants = event.participants
            const isAlreadyRegistered = eventParticipants.find((cur) => cur.email === participantData.email)
            if (isAlreadyRegistered) {
                return null
            }
        }
        if (!event || !(event.maxParticipants >= event.participants.length)) {
            return null
        }
        try {
            await mailNotifierAdapter.sendEmailNotification(participantData.email,`${event.name} event registration`,generateEventRegistrationHtml(participantData.name,event.location,event.date))
            return await eventsInDbRepository.updateEventsParticipants(participantData, eventId);

        }catch (err){
throw err;
        }

    },

}