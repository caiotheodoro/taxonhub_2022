import { wfoRepository } from 'src/modules/wfo/repositories';
import { TaxonomyRepository } from '../../repositories/implementations/TaxonomyRepository';
import { ImportCSVController } from './importLocalCSVController';
import { ImportLocalCSVUseCase } from './importLocalCSVUseCase';

const taxonomiesRepository = new TaxonomyRepository(wfoRepository);
const importLocalCSVUseCase = new ImportLocalCSVUseCase(taxonomiesRepository);
const importLocalCSVController = new ImportCSVController(importLocalCSVUseCase);

export { importLocalCSVController };
