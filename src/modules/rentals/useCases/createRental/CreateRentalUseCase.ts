import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

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
        const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if (isCarUnavailable) {
            throw new AppError("This car is not available", 409)
        }

        const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(user_id)

        console.log(userHasOpenRental)
        if (userHasOpenRental) {
            throw new AppError("You can only do one rental at a time", 409)
        }

        // const rentalLastsLongerThan24Hours = (
        //     expected_return_date.getMilliseconds() - new Date().getMilliseconds()
        // ) >= 1000 * 60 * 60 * 24
        // if(!rentalLastsLongerThan24Hours) {
        //     throw new AppError("The minimal rental duration is 24 hours", 406)
        // }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental

    }
}

export { CreateRentalUseCase }