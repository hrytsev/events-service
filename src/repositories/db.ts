import {MongoClient, ObjectId} from "mongodb";
import {EventType} from "../types/events/event";


const mongoUrl = 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);
const coursesDb=client.db("eventsService")




export const eventsCollection = coursesDb.collection<EventType>("events");

export const useDb = async () => {
    try {
        await client.connect();
        await client.db('events_service').command({ping: 1});
        console.log("Events db connected");
    } catch (error) {
        await client.close();
    }
}
