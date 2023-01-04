import { AppError } from "@errors/AppError"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
let rentalsRepository: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository)
    })

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "6789",
            expected_return_date: new Date()
        })

        console.log(rental)

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("Should not be able to create a new rental if there is another open rental for the user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "6789",
                expected_return_date: new Date()
            })

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "6123",
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("Should not be able to create a new rental if there is another open rental with the car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "9999",
                expected_return_date: new Date()
            })

            await createRentalUseCase.execute({
                user_id: "23456",
                car_id: "9999",
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    // it("Should not be able to create a rental with less", () => {

    // })
})