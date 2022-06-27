import { Router } from 'express';
import { getOccurrencyController } from 'src/modules/occurrency/useCases/getOccurrency';
import { FILES_FOLDER } from 'src/modules/config/constants';
const ocurrencyRoutes = Router();

ocurrencyRoutes.get('/generatecsv', (req, res) => {
    return getOccurrencyController.handle(req, res);
});

ocurrencyRoutes.get('/download', (req, res) => {
    const { userId } = req.query;
    res.download(`${FILES_FOLDER}/${userId}-occurrency.csv`);
}
);


export { ocurrencyRoutes };
