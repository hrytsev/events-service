import {body} from "express-validator";
import retryTimes = jest.retryTimes;

export const validateName = [
    body("name").isString().withMessage("Name is required").isLength({
        min: 3,
        max: 100
    }).withMessage("Name is not valid"),
]
export const validateDate = [
    body("date").isInt({min: 0}).withMessage("Date is required").custom(value => {
        const current = +new Date();
        const reqDate = parseInt(value, 10);
        if (current > reqDate) {
            throw new Error(`${current} is not a valid date`)
        } else return true
    }),
]
export const validateLocation = [
    body("location").isString().withMessage("Location is required"),
]
export const validateMaxParticipants = [
    body("maxParticipants").isInt({min: 0}),
]