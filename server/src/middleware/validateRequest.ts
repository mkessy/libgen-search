import log from "../logger";
import { Request, Response, NextFunction } from "express";

import { SearchParamsSchema } from "../libgen/schemas";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  log.info("Validating request");
  try {
    req.params = SearchParamsSchema.validateSync(req.params);
    return next();
  } catch (e) {
    if (e instanceof Error) {
      log.error(e.message);
      return res.sendStatus(400);
    } else {
      log.error(e);

      return res.sendStatus(400);
    }
  }
};

export default validateRequest;
