import {body} from "express-validator";
import {ObjectId} from "mongodb";
import {eventsInDbQueryRepository} from "../repositories/events/events-in-db-query-repository";

export const validateEmail = [
    body("email").isEmail().withMessage("Email is required"),
]
export const validateName = [
    body("name").isString().withMessage("Name is required").isLength({min: 2, max: 50}),
]
export const validateEventId = [
    body("eventId")
        .isString()
        .withMessage("EventId is required")
        .custom(async (value) => {
            if (ObjectId.isValid(value)) {
                const event = await eventsInDbQueryRepository.getEventById(value);
                if (!event) {
                    throw new Error(`${value} is not a valid event`);
                }else
                return true;
            } else {
                throw new Error(`${value} is not a valid ObjectId`);
            }
        }),
];