import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios'
import AnimatedRoutes from "./AnimatedRoutes";

function App() {

  const [results, setResults] = useState(false)
  const [results2, setResults2] = useState([])
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [year, setYear] = useState("")
  const [showMore, setShowMore] = useState({})
  const [imdbID, setImdbID] = useState("")
  const [fav, setFav] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'GET',
      url: 'https://my-movies7.herokuapp.com/search',
      params: { s: title, r: 'json', page: 1, type, year },
    };
    axios.request(options).then(function (response) {
      console.log(response.data);

      if (response.data.Response === "False" || response.status === 403) {
        setResults("noResults")
      } else {
        setResults(response.data)
      }
    }).catch(function (error) {
      console.error(error);
    });
    setTitle("")
    setType("")
    setYear("")
    setResults("loading")
    setResults2([])
    setShowMore( { s: title, r: 'json', page: 2, type, year} )
  }

  const handleSubmitMore = () => {
    console.log(results2)
    console.log(showMore)
    setShowMore (prevState => ({
      ...prevState,
      page: prevState.page + 1
    }))
    setLoading(true)
    console.log(showMore)
    const options = {
      method: 'GET',
      url: 'https://my-movies7.herokuapp.com/search',
      params: showMore,
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      if (response.data.Response === "False") {
        setResults2("")
        setLoading(false)
      } else {
        setResults2([...results2, ...response.data.Search])
        setLoading(false)
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    const token = localStorage.token
    axios.get('https://my-movies7.herokuapp.com/favourites', {
      params: {
        token
      }
    }
    )
      .then(function (response) {
        setFav(response.data)
      })
      .catch(function (error) {
        if(error.response.status === 401){
          setFav("login")
          localStorage.clear()
        };
      });
  }, [toggle])

  return (
    <div className="App">
      <Router >
        <Navbar
          handleSubmit={handleSubmit}
          title={title}
          type={type}
          year={year}
          imdbId={imdbID}
          setTitle={setTitle}
          setType={setType}
          setYear={setYear}
          setImdbID={setImdbID}
          setFav={setFav}
        />
        <AnimatedRoutes
        fav={fav}
        toggle={toggle}
        setToggle={setToggle}
        results={results}
        results2={results2}
        handleSubmitMore={handleSubmitMore}
        loading={loading}
        />
      </Router>
    </div>
  );
}

export default App;
