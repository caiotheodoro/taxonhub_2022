import { ImportBinomialNameCSVController } from './importBinomialNameCSVController';
import { ImportBinomialNameCSVUseCase } from './importBinomialNameCSVUseCase';

const importBinomialNameCSVUseCase = new ImportBinomialNameCSVUseCase();
const importBinomialNameCSVController = new ImportBinomialNameCSVController(
    importBinomialNameCSVUseCase,
);

export { importBinomialNameCSVController };
