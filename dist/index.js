"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./repositories/db");
const port = process.env.PORT || 3000;
const startApp = (port) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.useDb)();
        app_1.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
    catch (error) {
        console.log(error + "Starting app failed");
    }
});
startApp(+port);
