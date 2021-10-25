import config from "config";
import axios from "axios";
import cheerio from "cheerio";
import log from "../logger";
import { get } from "lodash";
import { Request, Response } from "express";
import { ResponseSchema } from "../libgen/schemas";

export enum SearchOptions {
  Identifier = "identifier",
  Title = "title",
}

export const search = async (req: Request, res: Response) => {
  //TO-DO: add smart mirror selection to automatically select a good mirror
  const searchString = get(req.params, "searchTerm");
  const searchColumn = get(req.params, "column");
  const baseUrl = config.get("libgen.mirrors.default") as string;
  const searchUrl = `${baseUrl}search.php?req=${searchString}&column=${searchColumn}`;
  log.info(`Searching: ${searchUrl}`);
  try {
    const axiosResponse = await axios.get<string>(searchUrl, { timeout: 3000 });
    log.info(`status: ${axiosResponse.status}`);
    if (axiosResponse.status !== 200) {
      throw new Error(`Error fetching data from ${searchUrl}`);
    }
    const bookIds = extractLibGenBookIds(axiosResponse.data);
    //if no results found for search this is still a valid result
    if (bookIds.length === 0) {
      return res.status(200).send(
        ResponseSchema.validateSync({
          count: bookIds.length,
          results: [],
        })
      );
    }

    const books = await fetchLibGenBookData(bookIds);
    const responseObj = ResponseSchema.validateSync({
      count: books.length,
      results: books,
    });
    return res.status(200).send(responseObj);
  } catch (error) {
    log.error(error);
    return res.sendStatus(503);
  }
};

//need to add structure to allow for easy addition of scraper logic for differnt domains

const extractLibGenBookIds = (rawHtmlString: string): string[] => {
  const $ = cheerio.load(rawHtmlString);
  log.info("parsed html");
  const libgenIds: string[] = [];
  $("td:first-child", "table.c > tbody").each((i, e) => {
    //skip first child since first tr is the table header
    if (i !== 0) {
      libgenIds.push($(e).text());
    }
  });

  return libgenIds;
};

const fetchLibGenBookData = async (bookIds: string[]): Promise<[any]> => {
  const searchFields = Object.values(config.get("libgen.searchFields"));
  //TO-DO: replace with function to fetch fastest mirror
  const baseUrl = config.get("libgen.mirrors.default");
  const searchUrl = `${baseUrl}json.php?ids=${bookIds.join(
    ","
  )}&fields=${searchFields.join(",")}`;
  log.info(`Fetching Book Data from URL ${searchUrl}`);

  const axiosResponse = await axios.get<[any]>(searchUrl, {
    timeout: 3000,
  });
  if (axiosResponse.status !== 200) {
    throw new Error(`Error fetching data from ${searchUrl}`);
  }
  return axiosResponse.data;
};
