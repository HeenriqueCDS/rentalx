import { Specification } from "../../models/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
    private speciications: Specification[]

    constructor() {
        this.speciications = []
    }
    findByName(name: string): Specification {
        const specification = this.speciications.find(
            specification => specification.name.toLowerCase() === name.toLowerCase()
        );
        return specification;
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.speciications.push(specification)
    }

}

export { SpecificationsRepository }