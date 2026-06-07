import {
    getAllArticles as fetchAllArticles,
    getArticleById as fetchArticleById,
    addArticle as saveArticle,
    removeArticle as removeArticleById
} from "../services/articlesService.js"

export const getAllArticles = async (req, res) => {
    try {
        const articles = await fetchAllArticles()
        res.json(articles)
    } catch (error) {
        res.status(500).json({ error: "Не вдалося отримати статті" })
    }
}

export const getArticleById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const article = await fetchArticleById(id)

        if (!article) {
            return res.status(404).json({ error: "Стаття не знайдена" })
        }

        res.json(article)
    } catch (error) {
        res.status(500).json({ error: "Не вдалося отримати стат" })
    }
}

export const createArticle = async (req, res) => {
    try {
        const articleData = req.body

        if (!articleData || Object.keys(articleData).length === 0) {
            return res.status(400).json({ error: "Тіло запиту не може бути порожнім" })
        }

        const article = await saveArticle(articleData)
        res.status(201).json(article)
    } catch (error) {
        res.status(500).json({ error: "Не вдалося створити статтю" })
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const removed = await removeArticleById(id)

        if (!removed) {
            return res.status(404).json({ error: "Стаття не знайдена для видалення" })
        }

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Не вдалося видалити статтю" })
    }
}

