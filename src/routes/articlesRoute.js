import express from "express"
import {
    getAllArticles,
    getArticleById,
    createArticle,
    deleteArticle
} from "../controller/articlesController.js"

const router = express.Router()

router.get("/", getAllArticles)
router.get("/:id", getArticleById)
router.post("/", createArticle)
router.delete("/:id", deleteArticle)

export default router
