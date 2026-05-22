import express from "express"

import { articles } from "./db/articles.js"


const app = express()

app.get("/", (req, res) => {
    res.json("оберiть маршрут")
})


app.get("/articles", (req, res) => {
    res.json(articles)
})

app.get("/articles/:id", (req, res) => {
    const id = Number(req.params.id)
    const article = articles.find((article) => article.id === id)
    res.json(id)
})


app.listen(3000, () => {
    console.log("Сервер запущений")
})