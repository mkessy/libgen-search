import "./App.css";
import fetchGoogleBooks from "./api/googleBooks";
//import { mirror, latest, random, search, utils } from "libgen";

const books = fetchGoogleBooks("holocaust inauthor:goldberg").then((books) =>
  console.log(books)
);

console.log(books);

function App() {
  console.log(process.env.REACT_APP_GBOOKS_API_KEY);

  return (
    <div className="App">
      <h1 class="mt-20 mx-auto text-xl font-bold">Welcome to Libgen Search</h1>
    </div>
  );
}

export default App;
