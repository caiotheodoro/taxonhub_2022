import cors from 'cors';
import express from 'express';

import managerCron from './manager-cron';
import { checkVersionAndUpdate } from './modules/routines/checkVersionAndUpdate';
import { EMetaTableValues } from './modules/wfo/enumerators/types';
import { wfoRepository } from './modules/wfo/repositories';
import { router } from './routes';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(router);

app.get('/', (_, res) => res.send('API UP'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    wfoRepository.updateDatabasePhaseStatus(EMetaTableValues.needToCheck);

    (async () => {
        await checkVersionAndUpdate();
    })();

    managerCron.run();
});
