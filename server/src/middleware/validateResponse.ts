import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { SearchParamsSchema } from "../libgen/schemas";
import { get } from "lodash";
import log from "../logger";
import { isBooleanObject } from "util/types";

export const validateResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return next();
  } catch (e: unknown) {
    log.error(e);
    return res.status(400).send(e);
  }
};
