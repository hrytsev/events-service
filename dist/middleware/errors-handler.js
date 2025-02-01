"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
const express_validator_1 = require("express-validator");
const HTTP_STATUSES_1 = require("../utils/configs/HTTP_STATUSES");
const errorsHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(HTTP_STATUSES_1.HTTP_STATUSES.BAD_REQUEST_400).send({ errors: errors.array() });
    }
    else
        next();
    return;
};
exports.errorsHandler = errorsHandler;
