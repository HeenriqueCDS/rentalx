import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authententicateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authententicateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })


    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "John Doe",
            email: "john@test.com",
            password: "123456",
            driver_license: "123456789"
        };

        await createUserUseCase.execute(user);

        const result = await authententicateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        
        expect(result).toHaveProperty("token");

    });

    it("Should not be able to authenticate a non-existing user", async () => {
        expect(async () => {
            await authententicateUserUseCase.execute({
                email: "idonotexist@anywhere.com",
                password: "123456",
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate a user with wrong password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "John Doe",
                email: "john@test.com",
                password: "123456",
                driver_license: "123456789"
            };
    
            await createUserUseCase.execute(user);
    
            await authententicateUserUseCase.execute({
                email: user.email,
                password: "wrongpassword",
            });
            

        }).rejects.toBeInstanceOf(AppError);

    });
});