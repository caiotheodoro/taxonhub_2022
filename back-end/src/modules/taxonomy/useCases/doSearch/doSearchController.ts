import { Request, Response } from 'express';

import { DoSearchUseCase } from './doSearchUseCase';

class DoSearchController {
    constructor(private doSearchUseCase: DoSearchUseCase) {}

    async handle(request: Request, response: Response) {
        const { data } = request.body;
        try {
            const result = await this.doSearchUseCase.execute(data);
            return response.status(200).json({
                status: 200,
                data: result,
            });
        }
        catch (error) {
            return response.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    }
}

export { DoSearchController };
