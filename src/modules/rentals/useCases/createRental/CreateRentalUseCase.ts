import { AppError } from "@errors/AppError";
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


    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<void> {
        const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if (isCarUnavailable) {
            throw new AppError("This car is not available", 409)
        }

        const user = await this.rentalsRepository.findOpenRentalByUser(user_id)
        if (user) {
            throw new AppError("You can only do one rental at a time", 409)
        }

        // const rentalLastsLongerThan24Hours = (
        //     expected_return_date.getMilliseconds() - new Date().getMilliseconds()
        // ) >= 1000 * 60 * 60 * 24
        // if(!rentalLastsLongerThan24Hours) {
        //     throw new AppError("The minimal rental duration is 24 hours", 406)
        // }

    }
}

export { CreateRentalUseCase }