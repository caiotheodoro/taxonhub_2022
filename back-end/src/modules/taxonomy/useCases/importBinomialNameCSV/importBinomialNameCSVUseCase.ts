import csvParser from 'csv-parser';
import fs from 'fs';
import { FileException } from 'src/modules/exception/FileException';
import { DefaultResponse } from 'src/modules/http/defaultResponse';
import { EHttpStatuses } from 'src/modules/http/httpStatus';

interface IBinomialName {
    binomialName: string;
}

class ImportBinomialNameCSVUseCase {
    async execute(
        file: Express.Multer.File,
    ): Promise<DefaultResponse<unknown>> {
        const stream = fs.createReadStream(file.path);

        try {
            if (fs.statSync(file.path).size === 0) {
                throw new FileException(
                    EHttpStatuses.BAD_REQUEST,
                    'File must not be empty',
                );
            }
        } catch (e: unknown) {
            if (e instanceof FileException) {
                return new DefaultResponse<unknown>(e.status, {
                    correct: false,
                    message: e.message,
                });
            }
        }

        const incorrectNames = [];

        try {
            await new Promise((resolve, reject) => {
                stream
                    .pipe(csvParser())
                    .on('data', (row) => {
                        const name: IBinomialName = row;

                        if (!this.parseLine(name)) {
                            incorrectNames.push(name.binomialName);
                        }
                    })
                    .on('error', () => {
                        reject(
                            new FileException(
                                EHttpStatuses.INTERNAL_SERVER_ERROR,
                                'Error on file import',
                            ),
                        );
                    })
                    .on('end', () => {
                        resolve('');
                    });
            });
        } catch {
            return new DefaultResponse<unknown>(
                EHttpStatuses.INTERNAL_SERVER_ERROR,
                {
                    correct: incorrectNames.length === 0,
                    incorrectNames,
                },
            );
        }

        return new DefaultResponse<unknown>(EHttpStatuses.SUCCESS, {
            correct: incorrectNames.length === 0,
            incorrectNames,
        });
    }

    private onlyLetters(str: string): boolean {
        return /^[a-zA-Z\s]+$/.test(str);
    }

    private parseLine(line: IBinomialName): boolean {
        const count = (line.binomialName.match(/ /g) || []).length;

        return this.onlyLetters(line.binomialName) && count === 1;
    }
}

export { ImportBinomialNameCSVUseCase };
