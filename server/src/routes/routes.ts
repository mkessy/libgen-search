import { Express, Request, Response } from "express";
export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get("/search/:searchTerm/:column", (req: Request, res: Response) => {
    //TO-DO: IMPLEMENT
    res.status(200).send();
  });
}
