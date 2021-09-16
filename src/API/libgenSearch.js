const MIRRORS = [
  {
    baseUrl: "https://libgen.fun",
  },
  {
    baseUrl: "https://libgen.is",
  },
  {
    baseUrl: "https://libgen.rs",
  },
];

const FIELDS = {
     def: "def", title: "title", author: "author", series: "series", year: "year", identifier: "identifier", md5: "md5";
   }

const LIBGEN_API_BASE_URL = MIRRORS[0];
const config = {
  maxResults: 40, //values: max=40, default=10
  orderBy: "relevance", // values: relevance(default), newest
  printType: "books", // values: books, magazines, all(default)
  projection: "full", // values: full(default), lite
  startIndex: 0,
};

/**
 *
 * @param {string} query
 * @returns {Promise}
 */
const fetchLibgenBooks = async function (query) {
  const queryString = buildLibgenQueryString(query);

  const init = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  try {
    const response = await fetch(queryString, init);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("There was an error fetching Google Books data");
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {string} query
 * @returns {string}
 */
const buildLibgenQueryString = (query) => {
  return `${BOOKS_API_BASE_URL}q=${query.split(" ").join("+")}&key=${
    process.env.REACT_APP_GBOOKS_API_KEY
  }`;
};

export default fetchGoogleBooks;
