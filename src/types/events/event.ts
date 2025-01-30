import {ObjectId} from "mongodb";

export type EventType = {
    _id?:ObjectId
    name: string;
    date: number;
    location: string;
    maxParticipants: number;
}