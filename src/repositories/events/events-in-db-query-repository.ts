import {EventType} from "../../types/events/event";
import {eventsCollection} from "../db";
import {ObjectId} from "mongodb";

export const eventsInDbQueryRepository = {
    getEventById: async (_id: string) => {
        return await eventsCollection.findOne({_id: new ObjectId(_id)});
    },
    getEvents: async () => {
        return await eventsCollection.find({}).toArray();
    }
}