class OccurrencyException extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export { OccurrencyException };
