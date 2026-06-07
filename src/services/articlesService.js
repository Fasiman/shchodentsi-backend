import fs from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, "../db/articles.json")

const readArticles = async () => {
    const raw = await fs.readFile(dataPath, "utf8")
    return JSON.parse(raw)
}

const writeArticles = async (articles) => {
    await fs.writeFile(dataPath, JSON.stringify(articles, null, 2), "utf8")
}

const getNextId = (articles) => {
    if (articles.length === 0) return 1
    return Math.max(...articles.map((article) => Number(article.id))) + 1
}

export const getAllArticles = async () => {
    return await readArticles()
}

export const getArticleById = async (id) => {
    const articles = await readArticles()
    return articles.find((article) => Number(article.id) === Number(id))
}

export const addArticle = async (articleData) => {
    const articles = await readArticles()
    const newArticle = {
        id: articleData.id ?? getNextId(articles),
        img: articleData.img || "",
        title: articleData.title || "Без назви",
        article: articleData.article || "",
        category: articleData.category || "",
        rate: articleData.rate ?? 0,
        saveCount: articleData.saveCount ?? 0,
        ownerId: articleData.ownerId ?? null,
        name: articleData.name || "",
        avatar: articleData.avatar || "",
        date: articleData.date || new Date().toISOString().slice(0, 10),
        createdAt: articleData.createdAt || new Date().toISOString()
    }

    articles.push(newArticle)
    await writeArticles(articles)
    return newArticle
}

export const removeArticle = async (id) => {
    const articles = await readArticles()
    const index = articles.findIndex((article) => Number(article.id) === Number(id))
    if (index === -1) {
        return false
    }

    articles.splice(index, 1)
    await writeArticles(articles)
    return true
}
