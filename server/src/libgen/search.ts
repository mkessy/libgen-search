import config from "config";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import log from "../logger";
import { LibGenBookResult } from "../types";
import { toInteger } from "lodash";

export enum SearchOptions {
  Identifier = "identifier",
  Title = "title",
}

export const search = async (searchString: string, searchBy: SearchOptions) => {
  //TO-DO: add smart mirror selection to automatically select a good mirror
  const baseUrl = config.get("libgen.mirrors.default") as string;
  const searchUrl = `${baseUrl}/search.php?req=${searchString}&column=${searchBy}`;
  log.info(`Searching: ${searchUrl}`);
  try {
    const axiosResponse = await axios.get<string>(searchUrl, { timeout: 3000 });
    log.info("status", axiosResponse.status);
    if (axiosResponse.status !== 200) {
      throw new Error(`Error fetching data from ${searchUrl}`);
    }
    const bookIds = extractLibGenIds(axiosResponse.data);
    return await fetchLibGenBookData(bookIds);
  } catch (error) {
    log.error(`${(error as Error).name}: ${(error as Error).message}`);
  }
};

const extractLibGenIds = (rawHtmlString: string): string[] => {
  const $ = cheerio.load(rawHtmlString);
  log.info("parsed html");
  const libgenIds: string[] = [];
  $("td[nowrap]:first-child").each((i, e) => {
    libgenIds.push($(e).text());
  });

  return libgenIds;
};

const fetchLibGenBookData = async (bookIds: string[]) => {
  const searchFields = Object.values(config.get("libgen.searchFields"));
  //TO-DO: replace with function to fetch fastest mirror
  const baseUrl = config.get("libgen.mirrors.default");
  const searchUrl = `${baseUrl}/json.php?ids=${bookIds.join(
    ","
  )}&fields=${searchFields.join(",")}`;
  log.info(`Fetching Book Data from URL ${searchUrl}`);

  const axiosResponse: AxiosResponse = await axios.get<JSON>(searchUrl, {
    timeout: 3000,
  });
  if (axiosResponse.status !== 200) {
    throw new Error(`Error fetching data from ${searchUrl}`);
  }
  return axiosResponse.data;
};
