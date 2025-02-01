"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamId = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
exports.validateParamId = [
    (0, express_validator_1.param)("id").custom(value => {
        return mongodb_1.ObjectId.isValid(value);
    })
];
