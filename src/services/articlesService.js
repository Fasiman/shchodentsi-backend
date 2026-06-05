import { articles } from "../db/articles.js";

export const getAllArticles = () => {
    return articles
}


export const getAllArticlesById = () => {
    return articles.find((article) => String(article.id) === String(id))


}


export const addArticle = (articleData) => {
    const article = {
        id: articleData.id,
        img: articleData.img,
        title: articleData.title,
        article: articleData.article,
        category: articleData.category,
        rate: articleData.rate,
        saveCount: articleData.saveCount,
        ownerId: articleData.ownerId,
        name: articleData.name,
        date: articleData.date,
        createdAt: articleData.createdAt
    }
}

export const removeArticle = () => {
    const index = articles.findIndex((article) => String(article.id) === String(id))
     articles.splice(index, 1)
    return true

}