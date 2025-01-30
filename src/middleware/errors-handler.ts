import {NextFunction,Response,Request} from "express";
import {validationResult} from "express-validator";
import {HTTP_STATUSES} from "../utils/configs/HTTP_STATUSES";

export const errorsHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({errors: errors.array()});
    } else
        next()
    return
}