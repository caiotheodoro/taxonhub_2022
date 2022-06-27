import { Request, Response } from 'express';
import { DefaultResponse } from 'src/modules/http/defaultResponse';

import { GetTaxonomyByNameUseCase } from './getTaxonomyByNameUseCase';

class GetTaxonomyByNameController {
    constructor(private getTaxonomyByNameUseCase: GetTaxonomyByNameUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const data: DefaultResponse<unknown> =
            await this.getTaxonomyByNameUseCase.executeResponse(name);

        return response.status(data.status).json(data);
    }
}

export { GetTaxonomyByNameController };
