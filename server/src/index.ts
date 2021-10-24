import express from "express";
import config from "config";
import log from "./logger";
import routes from "./routes/routes";
import cors from "cors";
import { search, SearchOptions } from "./middleware/search";

import { Express, Request, Response } from "express";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app: Express = express();
// Body parsing Middleware
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes(app);

try {
  app.listen(port, host, (): void => {
    log.info(`Server listening at http://${host}:${port}`);
  });
} catch (error: any) {
  log.error(error);
}
