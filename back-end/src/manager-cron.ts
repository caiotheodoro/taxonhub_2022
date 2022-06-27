import cron from 'node-cron';

import { routine } from './modules/routines/checkVersionAndUpdate';

class ManagerCron {
    private jobs: cron.ScheduledTask[];

    constructor() {
        this.jobs = [routine];
    }

    run() {
        this.jobs.forEach((job) => job.start());
    }
}

export default new ManagerCron();
