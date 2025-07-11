import { HttpStatusCode } from "axios";

export interface HttpError {
  message: string;
  httpStatus: HttpStatusCode;
}
