const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { randomUUID } = crypto;
const { json } = bodyParser;

const app = express();
app.use(json());

const movies = [
  {
    _id: "634b8173fefd67ce2ee9516f",
    plot: "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg",
    title: "The Great Train Robbery",
    rated: "TV-G",
    __v: 0,
  },
  {
    _id: "634b9279c1dc1beeb8003447",
    plot: "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg",
    title: "The Great Train Robbery 2",
    rated: "TV-G",
    __v: 0,
  },
  {
    _id: "634bab13ac3ee20086d30dae",
    plot: "Two peasant children, Mytyl and Tyltyl, are led by Berylune, a fairy, to search for the Blue Bird of Happiness. Berylune gives Tyltyl a cap with a diamond setting, and when Tyltyl turns the...",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjNlMThmNzItMTZlMS00YzJkLTk1MzktYzIyMzllOGFmZmRlXkEyXkFqcGdeQXVyMzE0MjY5ODA@._V1_SY1000_SX677_AL_.jpg",
    title: "The Blue Bird",
    rated: "TV-B",
    __v: 0,
  },
];

// initialize db
const users = [
  {
    _id: "634b869a4c258ebcdd8a8af7",
    name: "Ned Stark",
    email: "sean_bean@gameofthron.es",
    password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu",
    __v: 0,
  },
  {
    _id: "634ba6b6044fe324bada04a7",
    name: "Tywin Lannister",
    email: "charles_dance@gameofthron.es",
    password: "$2b$12$/i04T5yEJvmsBhF0Jd.kJOk3ZhRzezbTU7ASEM5o43Xxsa4o6IgEy",
    __v: 0,
  },
  {
    _id: "634ba6d5044fe324bada04aa",
    name: "Tyrion Lannister",
    email: "peter_dinklage@gameofthron.es",
    password: "$2b$12$xtHwQNXYlQzP2REobUDlzuQimjzBlXrTx1GnwP.xkfULeuuUpRxa2",
    __v: 0,
  },
];

const review = [
  {
    _id: "634b9316044fe324bada04a2",
    user_id: "634b869a4c258ebcdd8a8af7",
    date: "2022-10-16T05:13:52.186Z",
    review: "great movies",
    movie_id: "634b8173fefd67ce2ee9516f",
    __v: 0,
  },
  {
    _id: "634baa50606954ee4fda629e",
    user_id: "634ba6b6044fe324bada04a7",
    date: "2022-10-16T06:51:43.772Z",
    review: "achived",
    movie_id: "634b8173fefd67ce2ee9516f",
    __v: 0,
  },
];

// find all movies
app.get("/v1/movies", (req, res) => res.send(movies));

// find all TV-G rated movies
app.get("/v1/movies/classification", (req, res) => {
  const rated = req.query.rated;
  const ratedMovies = movies.filter((movie) => movie.rated == rated);
  res.status(200).send(ratedMovies);
});

app.listen(8060, () => {
  console.log("Server is running on http://localhost:8060");
});

//add new movie
app.post("/v1/movies", (req, res) => {
  console.log(req.body);
  const newMovies = {
    _id: randomUUID(),
    plot: req.body.plot,
    poster: req.body.poster,
    title: req.body.title,
    rated: req.body.rated,
    __v: 0,
  };
  movies.push(newMovies);
  res.send(movies);
});

//get movies by id
app.get("/v1/movies/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const selectedMovies = movies.filter((movie) => movie._id == id);
  res.status(200).send(selectedMovies);
  console.log(selectedMovies);
});

//update movies by id
app.put("/v1/movies/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updateMovie = req.body;
  const indexOfMovie = movies.findIndex((m) => m._id == id);
  movies[indexOfMovie] = updateMovie;
  res.status(200).send(newUpdateData);
});

//delete movie
app.delete("/v1/movies/:id", (req, res) => {
  const id = req.params.id;
  const restMovies = movies.filter((m) => m._id != id);

  res.status(200).send(restMovies);
});
