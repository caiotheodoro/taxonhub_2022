import { Router } from 'express';
import { generateCSVController } from 'src/modules/taxonomy/useCases/generateCSV';

const taxonomyRoutes = Router();

taxonomyRoutes.get('/generatecsv', (req, res) => {
    return generateCSVController.handle(req, res);
});

export { taxonomyRoutes };
