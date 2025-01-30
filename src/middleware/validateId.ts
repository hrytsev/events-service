import {NextFunction} from "express";
import {param} from "express-validator";
import {ObjectId} from "mongodb";

export const validateId = [
    param("_id").custom(value=>{
        return ObjectId.isValid(value);
    })
]