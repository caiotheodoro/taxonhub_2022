import { Request, Response } from 'express';
import { DefaultResponse } from 'src/modules/http/defaultResponse';

import { GenerateCSVUseCase } from './generateCSVUseCase';

class GenerateCSVController {
    constructor(private generateCSVUseCase: GenerateCSVUseCase) {}

    async handle(request: Request, response: Response): Promise<void> {
        const { userId } = request.query;

        const data: DefaultResponse<string> =
            await this.generateCSVUseCase.executeResponse(userId as string);

        return response.download(data.data, 'taxonomy.csv');
    }
}

export { GenerateCSVController };
