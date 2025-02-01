import {MongoClient, ObjectId} from "mongodb";
import {EventType} from "../types/events/event";

const login = process.env.LOGIN || 'login';
const password = process.env.PASSWORD || 'password';
 const mongoUrl =process.env.MONGODB_URI || 'mongodb://localhost/';
     // `mongodb://${login}:${password}@mongo-container:27017/eventService?authSource=admin`;
const client = new MongoClient(mongoUrl);
const coursesDb = client.db("eventsService")


export const eventsCollection = coursesDb.collection<EventType>("events");

export const useDb = async () => {
    try {
         console.log( mongoUrl)
        await client.connect();
        await client.db('eventsService').command({ping: 1});
        console.log("Events db connected");
    } catch (error) {
        console.log(error);
        await client.close();
    }
}
