/* 
q - Search for volumes that contain this text string. 
intitle: Returns results where the text following this keyword is found in the title.
inauthor: Returns results where the text following this keyword is found in the author.
inpublisher: Returns results where the text following this keyword is found in the publisher.
subject: Returns results where the text following this keyword is listed in the category list of the volume.
isbn: Returns results where the text following this keyword is the ISBN number.
lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
oclc: Returns results where the text following this keyword is the Online Computer Library Center number.
 */

const BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes?";
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
const fetchGoogleBooks = async function (query) {
  const queryString = buildGBooksQueryString(query);

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
const buildGBooksQueryString = (query) => {
  return `${BOOKS_API_BASE_URL}q=${query.split(" ").join("+")}&key=${
    process.env.REACT_APP_GBOOKS_API_KEY
  }`;
};

export default fetchGoogleBooks;
