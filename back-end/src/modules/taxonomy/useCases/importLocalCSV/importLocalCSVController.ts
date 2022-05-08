import { Request, Response } from 'express';

import { ImportLocalCSVUseCase } from './importLocalCSVUseCase';

class ImportCSVController {
    constructor(private importCategoryUseCase: ImportLocalCSVUseCase) { }
    async handle(request: Request, response: Response): Promise<Response> {
        try {

            const { file } = request;

            let data = await this.importCategoryUseCase.execute(file); // faz a busca
            console.log(data);
            return response.status(200).json({...data});
        }
        catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { ImportCSVController };
