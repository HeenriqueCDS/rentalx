import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "ix35",
            description: "Nova ix35 2022",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Hyundai",
            category_id: "b5d2e0b8-ee70-4af1-951d-dde1231238e6"
        }); 

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Civic",
            description: "Novo Civic 2022",
            daily_rate: 100,
            license_plate: "DEF-1234",
            fine_amount: 100,
            brand: "Honda",
            category_id: "b5d2e0b8-ee70-4af1-951d-dde1231238e6"
        }); 

        const cars = await listAvailableCarsUseCase.execute({name: "Civic"});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Supra",
            description: "Classic Supra 1993",
            daily_rate: 100,
            license_plate: "FGH-1234",
            fine_amount: 100,
            brand: "Toyota",
            category_id: "b5d2e0b8-ee70-4af1-951d-dde1231238e6"
        }); 

        const cars = await listAvailableCarsUseCase.execute({brand: "Toyota"});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Skyline",
            description: "É O Braian",
            daily_rate: 100,
            license_plate: "IJK-1234",
            fine_amount: 100,
            brand: "Nissan",
            category_id: "e_o_braian_id"
        }); 

        const cars = await listAvailableCarsUseCase.execute({category_id: "e_o_braian_id"});

        expect(cars).toEqual([car]);
    });
});