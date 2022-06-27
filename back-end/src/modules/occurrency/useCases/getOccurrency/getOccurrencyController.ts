import { Request, Response } from 'express';
import { DefaultResponse } from 'src/modules/http/defaultResponse';

import { GetOccurrencyUseCase } from './getOccurrencyUseCase';

class GetOccurrencyController {
    constructor(private getOccurrencyUseCase: GetOccurrencyUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = request.query;

        const data: DefaultResponse<string> =
            await this.getOccurrencyUseCase.executeResponse(userId as string);

        return response.download(data.data, 'occurrency.csv');
    }
}

export { GetOccurrencyController };
