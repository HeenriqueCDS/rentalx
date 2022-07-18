import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";


import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error("Email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email or password incorrect!")
        }

        const token = sign({}, "83a6c8fb8e054de73cb4f76c3c6f9701", {
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token,
        }
    }
}

export { AuthenticateUserUseCase }