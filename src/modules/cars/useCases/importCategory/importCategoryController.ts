import { Response, Request } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    constructor(private importCategoryUseCae: ImportCategoryUseCase) {}

    handle(req: Request, res: Response): Response {
        const { file } = req;
        this.importCategoryUseCae.execute(file)
        return res.send();
    }
}
export { ImportCategoryController }