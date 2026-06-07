import express from "express"
import articlesRouter from "./routes/articlesRoute.js"

import cors from "cors"

const app = express()


app.use(cors)

app.use(express.json())
app.use("/articles", articlesRouter)

app.get("/", (req, res) => {
    res.json("оберіть маршрут")
})

app.listen(1487, () => {
    console.log("localhost:1487")
})