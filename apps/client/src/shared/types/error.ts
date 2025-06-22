import { HttpStatusCode } from "axios";

export interface HttpError extends Error {
  httpStatus: HttpStatusCode;
}
