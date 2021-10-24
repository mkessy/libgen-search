import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validateResponse =
  (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (e: unknown) {
      log.error(e);
      return res.status(400).send(e);
    }
  };

export default validateResponse;
