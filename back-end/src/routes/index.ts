import { Router } from 'express';
import multer from 'multer';
import { FILES_FOLDER } from 'src/modules/config/constants';
import { importBinomialNameCSVController } from 'src/modules/taxonomy/useCases/importBinomialNameCSV';

import { ocurrencyRoutes } from './occurrency.routes';
import { taxonomyRoutes } from './taxonomy.routes';
import { wfoRoutes } from './wfo.routes';

const storage = multer.diskStorage({
    destination: FILES_FOLDER,
    filename(req, file, cb) {
        const { userId } = req.query;
        cb(null, `${userId}-binomialNames.csv`);
    },
});

const upload = multer({
    storage,
});

const router = Router();

router.use('/taxonomy', taxonomyRoutes);
router.use('/occurrency', ocurrencyRoutes);
router.use('/wfo', wfoRoutes);

router.post('/import', upload.single('file'), (req, res) => {
    return importBinomialNameCSVController.handle(req, res);
});

//route to download the csv file




export { router };
