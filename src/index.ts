import {app} from "./app";
import {useDb} from "./repositories/db";

const port = process.env.PORT||3000;
const startApp = async (port: number) => {
    try {
        await useDb()
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
    } catch (error) {
        console.log(error+"Starting app failed");
    }
}
startApp(+port)
