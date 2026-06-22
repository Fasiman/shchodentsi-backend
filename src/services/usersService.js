import fs from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcryptjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, "../db/users.json")

const readUsers = async () => {
    const raw = await fs.readFile(dataPath, "utf8")
    return JSON.parse(raw)
}

const writeUsers = async (users) => {
    await fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf8")
}

const getNextId = (users) => {
    if (users.length === 0) return 1
    return Math.max(...users.map((u) => Number(u.id))) + 1
}

export const getAllUsers = async () => {
    return await readUsers()
}

export const getUserById = async (id) => {
    const users = await readUsers()
    return users.find((u) => Number(u.id) === Number(id))
}

export const getUserByEmail = async (email) => {
    const users = await readUsers()
    return users.find((u) => u.email === email)
}

export const addUser = async (userData) => {
    const users = await readUsers()
    const newUser = {
        id: userData.id ?? getNextId(users),
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        name: userData.name || ""
    }
    users.push(newUser)
    await writeUsers(users)
    return newUser
}

export const removeUser = async (id) => {
    const users = await readUsers()
    const index = users.findIndex((u) => Number(u.id) === Number(id))
    if (index === -1) return false
    users.splice(index, 1)
    await writeUsers(users)
    return true
}
