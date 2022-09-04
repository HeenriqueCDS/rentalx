import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory 

describe("Create car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })
    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Fusca",
            brand: "Volkswagen",
            category_id: "5f3f8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f",
            daily_rate: 100,
            description: "Carro de luxo",
            fine_amount: 100,
            license_plate: "ABC-1234"
        })
    })
})