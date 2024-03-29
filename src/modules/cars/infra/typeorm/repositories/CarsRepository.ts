import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        license_plate, 
        name, 
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate, 
            name, 
            specifications,
            id
        })

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOne({license_plate});

    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id)
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

        const carsQuery = this.repository
        .createQueryBuilder("c")
        .where("available = :available", {available: true})

        
        if (name) {
            carsQuery.andWhere("c.name = :name", {name})
        }

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", {brand})
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", {category_id})
        }

        const cars = await carsQuery.getMany();

        return cars
    };
    
}

export { CarsRepository }