import { Request, Response } from 'express';
import { DefaultResponse } from 'src/modules/http/defaultResponse';

import { GetVersionUseCase } from './getVersionUseCase';

class GetVersionController {
    constructor(private getVersionUseCase: GetVersionUseCase) {}

    async handle(_request: Request, response: Response): Promise<Response> {
        const data: DefaultResponse<unknown> =
            await this.getVersionUseCase.executeResponse();

        return response.status(data.status).json(data);
    }
}

export { GetVersionController };
