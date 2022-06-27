import AdmZip from 'adm-zip';
import fs from 'fs';
import puppeteer from 'puppeteer';
import request from 'superagent';

import { pathToFolder, zipFile } from '../../constants';

class DownloadNewDataUseCase {
    private async getDownloadLink(): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('http://www.worldfloraonline.org/downloadData', {
            timeout: 180000,
        });

        const url = await page.evaluate(() => {
            return Array.from(document.links)
                .map((link) => link.href)
                .filter((link) => link.includes('zip'));
        });

        if (url === undefined || url === null) {
            throw new Error('Url was not found.');
        }

        await browser.close();

        return url[0];
    }

    private setPath(path: string) {
        if (path === undefined || path === null) {
            throw new Error('Path error.');
        }

        fs.rmSync(path, { recursive: true, force: true });

        if (!fs.existsSync(path)) fs.mkdirSync(path);
    }

    private async downloadFile(
        link: string,
        pathToFolder: string,
        fullPath: string,
    ) {
        await new Promise((resolve, reject) => {
            request
                .get(link)
                .pipe(fs.createWriteStream(fullPath))
                .on('finish', () => {
                    const zip = new AdmZip(fullPath);
                    zip.extractAllTo(pathToFolder);

                    resolve('Done');
                })
                .on('error', () => {
                    reject(new Error('Could not download file'));
                });
        });
    }

    async execute() {
        try {
            const link = await this.getDownloadLink();

            this.setPath(pathToFolder);

            await this.downloadFile(
                link,
                pathToFolder,
                pathToFolder.concat('/', zipFile),
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
        }
    }
}

export { DownloadNewDataUseCase };
