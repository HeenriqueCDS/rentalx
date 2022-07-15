import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, driver_license, email, password, username } = req.body
        const createUserUseCase = container.resolve(CreateUserUseCase)
        await createUserUseCase.execute({ name, driver_license, email, password, username })

        return res.status(201).send()
    }
}

export { CreateUserController }