import {ObjectId} from "mongodb";
import {ParticipantType} from "./participants";

export type EventType = {
    _id?:ObjectId
    name: string;
    date: number;
    location: string;
    maxParticipants: number;
    participants: ParticipantType[];
}
export type EventFilters={
    name?: string,
    date?: string,
    location?: string,
    [key: string]: string | undefined;
}

