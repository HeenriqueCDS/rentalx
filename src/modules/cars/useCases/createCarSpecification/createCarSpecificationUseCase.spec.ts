import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecifcationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationsRepositoryInMemory();

        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository,
            specificationsRepository
        );
    })

    it("should not be able to add a new specification to a non existing car", async () => {
        expect(async () => {
            const car_id = "1234"
            const specifications_id = ["4321"]

            await createCarSpecificationUseCase.execute({ car_id, specifications_id })
        }).rejects.toBeInstanceOf(AppError)

    })

    it("should be able to add a new specification to a car", async () => {
        const car = await carsRepository.create({
            name: "Fusca",
            brand: "Volkswagen",
            category_id: "5f3f8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f",
            daily_rate: 100,
            description: "Carro de luxo",
            fine_amount: 100,
            license_plate: "ABC-1234"
        });

        const specification = await specificationsRepository.create({
            name: "Rebaixado",
            description: "Socado no chão",
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })

})