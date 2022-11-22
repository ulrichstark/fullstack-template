import httpStatus from "http-status";

export class HttpError extends Error {
    public status: number;

    constructor(status: number, message?: string) {
        super(message || httpStatus[status].toString());
        this.status = status;
    }
}
