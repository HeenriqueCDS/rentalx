import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

dayjs.extend(utc)

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}


class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,
    ) {}


    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimalRentalDurationInHours = 24; 

        const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if (isCarUnavailable) {
            throw new AppError("This car is not available", 409)
        }

        const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(user_id)
        if (userHasOpenRental) {
            throw new AppError("You can only do one rental at a time", 409)
        }

        const dateNow = dayjs().utc().local().format()
        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()

        const rentalDurationInHours = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")
    
        if(rentalDurationInHours < minimalRentalDurationInHours) {
            throw new AppError("The minimal rental duration is 24 hours")
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental

    }
}

export { CreateRentalUseCase }