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
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "6789",
            expected_return_date: new Date()
        })
    })

    // it("Should not be able to create a rental with less", () => {

    // })
})