import log from "../logger";
import { Request, Response, NextFunction } from "express";

import { SearchParamsSchema } from "../libgen/schemas";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  log.info("Validating request");
  try {
    if (!SearchParamsSchema.isValidSync(req.params)) {
      throw new Error("Invalid search term parameter");
    }
    return next();
  } catch (e) {
    if (e instanceof Error) {
      log.error(e.message);
      res.status(400).send(e.message);
    } else {
      log.error(e);

      res.status(400).send(e);
    }
  }
};

export default validateRequest;
