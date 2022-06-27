import { Request, Response } from 'express';

import { ImportBinomialNameCSVUseCase } from './importBinomialNameCSVUseCase';

class ImportBinomialNameCSVController {
    constructor(
        private importBinomialNameCSVUseCase: ImportBinomialNameCSVUseCase,
    ) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        const data = await this.importBinomialNameCSVUseCase.execute(file);

        return response.status(data.status).json(data);
    }
}

export { ImportBinomialNameCSVController };
