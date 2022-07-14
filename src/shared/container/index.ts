import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository"

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategorysRepository"
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)