import { Express, Request, Response } from "express";
import { search } from "../controller/search";
import validateRequest from "../middleware/validateRequest";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get("/search/:searchTerm/:column?", validateRequest, search);
}
