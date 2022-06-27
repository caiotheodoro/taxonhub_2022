import { GetOccurrencyController } from './getOccurrencyController';
import { GetOccurrencyUseCase } from './getOccurrencyUseCase';

const getOccurrencyUseCase = new GetOccurrencyUseCase();
const getOccurrencyController = new GetOccurrencyController(
    getOccurrencyUseCase,
);

export { getOccurrencyController };
