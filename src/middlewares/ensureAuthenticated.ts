import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "83a6c8fb8e054de73cb4f76c3c6f9701")
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id.toString())

        if (!user) {
            throw new AppError("User does not exists!", 401)
        }
        next()
    }
    catch (err) {
        throw new AppError("Invalid token!", 401)
    }
}