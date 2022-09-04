import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    create(data: ICreateCarDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    cars: Car[] = [];
    
    async ({
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        license_plate, 
        name, 
    }: ICreateCarDTO): Promise<void> {
        const car = new Car()

        Object.assign(car, {
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate, 
            name, 
        })

        this.cars.push(car)
        
        return;
    }

}

export { CarsRepositoryInMemory };