import express from "express"
import {
    registerUser,
    getUsers,
    getUserById,
    deleteUser
} from "../controller/usersController.js"
import { userSchema, deleteUserSchema, validateRequest } from "../schemas/userSchemas.js"

const router = express.Router()

router.post("/register", validateRequest(userSchema), registerUser)
router.get("/", getUsers)
router.get("/:id", getUserById)
router.delete("/:id", validateRequest(deleteUserSchema, 'params'), deleteUser)

export default router
