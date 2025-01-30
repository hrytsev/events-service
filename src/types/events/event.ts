import {ObjectId} from "mongodb";
import {ParticipantType} from "../../repositories/db";

export type EventType = {
    _id?:ObjectId
    name: string;
    date: number;
    location: string;
    maxParticipants: number;
    participants: ParticipantType[];
}