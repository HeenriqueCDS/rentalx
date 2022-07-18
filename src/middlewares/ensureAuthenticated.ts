import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "83a6c8fb8e054de73cb4f76c3c6f9701")
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id.toString())

        if (!user) {
            throw new Error("User does not exists!")
        }
        next()
    }
    catch (err) {
        throw new Error("Invalid token!")
    }
}