import {EventType} from "../../types/events/event";
import {eventsCollection} from "../db";

export const eventsInDbRepository = {
    addEvent: async (event:EventType) => {
    return    await eventsCollection.insertOne(event);
    }
}