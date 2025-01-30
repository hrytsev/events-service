import {app} from "./app";
import {useDb} from "./repositories/db";

const port = 4200;
const startApp = async (port: number) => {
    try {
        await useDb()
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
startApp(port)
