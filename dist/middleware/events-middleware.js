"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMaxParticipants = exports.validateLocation = exports.validateDate = exports.validateName = void 0;
const express_validator_1 = require("express-validator");
exports.validateName = [
    (0, express_validator_1.body)("name").isString().withMessage("Name is required").isLength({
        min: 3,
        max: 100
    }).withMessage("Name is not valid"),
];
exports.validateDate = [
    (0, express_validator_1.body)("date").isInt({ min: 0 }).withMessage("Date is required").custom(value => {
        const current = +new Date();
        const reqDate = parseInt(value, 10);
        if (current > reqDate) {
            throw new Error(`${current} is not a valid date`);
        }
        else
            return true;
    }),
];
exports.validateLocation = [
    (0, express_validator_1.body)("location").isString().withMessage("Location is required"),
];
exports.validateMaxParticipants = [
    (0, express_validator_1.body)("maxParticipants").isInt({ min: 0 }),
];
