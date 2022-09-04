import { AppError } from "@errors/AppError"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })
    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Fusca",
            brand: "Volkswagen",
            category_id: "5f3f8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f",
            daily_rate: 100,
            description: "Carro de luxo",
            fine_amount: 100,
            license_plate: "ABC-1234"
        })

        expect(car).toHaveProperty("id")
    })

    it("Should not be able to create car with an alredy existing plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Fusca",
                brand: "Volkswagen",
                category_id: "5f3f8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f",
                daily_rate: 100,
                description: "Carro de luxo",
                fine_amount: 100,
                license_plate: "ABC-1234"
            })

            await createCarUseCase.execute({
                name: "Gol",
                brand: "Volkswagen",
                category_id: "4f3f8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f",
                daily_rate: 100,
                description: "Carro de luxo",
                fine_amount: 100,
                license_plate: "ABC-1234"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("A car should defaulty be created with disponibility", async () => {
        const car = await createCarUseCase.execute({
            name: "Avaliabe Car",
            brand: "Volkswagen",
            category_id: "4f3f8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f",
            daily_rate: 100,
            description: "Carro de luxo",
            fine_amount: 100,
            license_plate: "ABC-1234"
        })

        expect(car.available).toBe(true)
    })
})