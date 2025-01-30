const cookieParser = require('cookie-parser');
require('dotenv').config();
import express from "express";
import {getEventsRouter} from "./routers/events-router";

export const app = express();
app.use(express.json())
app.use(cookieParser())
const addRoutes = () => {
    const eventsRouter = getEventsRouter();
    app.use('/events', eventsRouter);
}
addRoutes()