import {
    getAllUsers as fetchAllUsers,
    getUserById as fetchUserById,
    getUserByEmail as fetchUserByEmail,
    addUser as saveUser,
    removeUser as removeUserById
} from "../services/usersService.js"

export const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }

        const existing = await fetchUserByEmail(email)
        if (existing) {
            return res.status(409).json({ error: "Користувач з таким email вже існує" })
        }

        const user = await saveUser({ email, password, name })
        // Do not return password hash
        res.status(201).json({ id: user.id, email: user.email, name: user.name })
    } catch (error) {
        res.status(500).json({ error: "Не вдалося зареєструвати користувача" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers()
        // hide passwords
        const safe = users.map(({ password, ...rest }) => rest)
        res.json(safe)
    } catch (error) {
        res.status(500).json({ error: "Не вдалося отримати користувачів" })
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const user = await fetchUserById(id)
        if (!user) return res.status(404).json({ error: "Користувач не знайдений" })
        const { password, ...safe } = user
        res.json(safe)
    } catch (error) {
        res.status(500).json({ error: "Не вдалося отримати користувача" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const removed = await removeUserById(id)
        if (!removed) return res.status(404).json({ error: "Користувач не знайдений для видалення" })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Не вдалося видалити користувача" })
    }
}
