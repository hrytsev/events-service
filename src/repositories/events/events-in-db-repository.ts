import {EventType} from "../../types/events/event";
import {eventsCollection} from "../db";
import {ObjectId} from "mongodb";
import {ParticipantType} from "../../types/events/participants";

export const eventsInDbRepository = {
    addEvent: async (event: EventType) => {
        return await eventsCollection.insertOne(event);
    },
    deleteEventById: async (id: string) => {
        return await eventsCollection.deleteOne({_id: new ObjectId(id)});
    },
    updateEventsParticipants: async (newParticipant: ParticipantType, eventId: string) => {
        return await eventsCollection.updateOne({_id:new ObjectId(eventId)}, {$push:{participants:newParticipant}});

    }
    }