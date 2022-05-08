/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import multer from 'multer';
import { generateCSVController } from 'src/modules/taxonomy/useCases/generateCSV';
import { getTaxonomyByNameController } from 'src/modules/taxonomy/useCases/getTaxonomy';

import { importLocalCSVController } from '../modules/taxonomy/useCases/importLocalCSV';

const taxonomyRoutes = Router();
const upload = multer({
    dest: './tmp',
    limits: {
        fileSize: 1000000,
    },
});

taxonomyRoutes.get('/', (_req, res) => {
    res.send('Hello taxonomy');
});

taxonomyRoutes.get('/specie', (req, res) => {
    return getTaxonomyByNameController.handle(req, res);
});

taxonomyRoutes.get('/speciesTest', (req, res) => {
    return generateCSVController.handle(req, res);
});

taxonomyRoutes.post('/import', upload.single('file'), (req, res) => {
    return importLocalCSVController.handle(req, res);
});

export { taxonomyRoutes };
