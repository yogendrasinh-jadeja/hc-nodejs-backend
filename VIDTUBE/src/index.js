import dotenv from "dotenv"
import { app } from './app.js'
import connectDb from "./db/index.js"

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3001

await connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    })
}).catch((err) => {
    console.log("database connection error", err);
})
