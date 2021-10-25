import express from "express";
import config from "config";
import log from "./logger";
import routes from "./routes/routes";
import cors from "cors";

import { Express, Request, Response } from "express";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app: Express = express();
// Body parsing Middleware
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

try {
  app.listen(port, host, (): void => {
    log.info(`Server listening at http://${host}:${port}`);
    routes(app);
  });
} catch (error: any) {
  log.error(error);
}
