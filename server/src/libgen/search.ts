import config from "config";
import axios, { AxiosResponse } from "axios";
import parser from "node-html-parser";
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
  try {
    const axiosResponse = await axios.get<string>(searchUrl);
    if (axiosResponse.status !== 200)
      throw new Error(`Error fetching data from ${searchUrl}`);
    const searchResults: LibGenBookResult[] | null = processLibGenRawHTML(
      axiosResponse.data
    );
  } catch (error) {
    log.error(`${(error as Error).name}: ${(error as Error).message}`);
  }
};

const processLibGenRawHTML = (
  rawHtmlString: string
): LibGenBookResult[] | null => {
  const document = parser(rawHtmlString);

  const searchResults = document
    .querySelector(
      "body > table:nth-child(3) > tbody > tr > td:nth-child(1) > font"
    )
    ?.textContent.split(" ")[0];

  if (!searchResults) return null;
  const libGenIdsTable = document.querySelector(
    "body > table.c"
  ) as HTMLTableElement | null;
  if (libGenIdsTable) {
    const libGenBookIds: typeof libGenIdsTable.rows = [];
    for (const row of libGenBookIds) {
      row;
    }
  }
};
