import express from "express"
import {
    getAllArticles,
    getArticleById,
    createArticle,
    deleteArticle
} from "../controller/articlesController.js"
import { articleSchema, deleteArticleSchema } from "../schemas/articleSchemas.js"
import { validateRequest } from "../schemas/userSchemas.js"

const router = express.Router()

router.get("/", getAllArticles)
router.get("/:id", getArticleById)
router.post("/", validateRequest(articleSchema), createArticle)
router.delete("/:id", validateRequest(deleteArticleSchema, 'params'), deleteArticle)

export default router
