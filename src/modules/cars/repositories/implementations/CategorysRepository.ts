import { Category } from "../../models/Category"
import {
    ICategoriesRepository,
    ICreateCategoryDTO
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[]

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository()
        }
        return CategoriesRepository.INSTANCE
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category()
        Object.assign(category, {
            name,
            description,
        })
        this.categories.push(category)
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(category => category.name.toLowerCase() === name.toLowerCase())
        return category
    }
}


export { CategoriesRepository }