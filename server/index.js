const express = require("express")
const cors = require("cors")
const axios = require("axios")
const rateLimit = require('express-rate-limit')
const slowDown = require("express-slow-down")
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./model/user')
const Count = require('./model/count')
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 8000;

<<<<<<< HEAD
mongoose
  .connect(CONNECTION_URL, { dbName: "movies" })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
=======
mongoose.connect(CONNECTION_URL, {dbName: "movies"})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb
// Apply the rate limiting middleware to all requests
app.use(limiter)

const speedLimiter = slowDown({
<<<<<<< HEAD
  windowMs: 30 * 1000, // 15 minutes
  delayAfter: 20, // allow 100 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
=======
    windowMs: 30 * 1000, // 15 minutes
    delayAfter: 20, // allow 100 requests per 15 minutes, then...
    delayMs: 500 // begin adding 500ms of delay per request above 100:
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb
});
//  apply to all requests
app.use(speedLimiter);

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.json("WORKING");
});

app.get("/favourites", async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ err: "User token missing" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const _id = user.id;
    const document = await User.findOne({ _id }).lean();
    const movies = document.movies;
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(401).json({ err: "You were loggod out." });
  }
});

app.post("/favourites", async (req, res) => {
  const movie = req.body.movie;
  const token = req.body.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const _id = user.id;
    await User.updateOne(
      { _id },
      {
        $push: {
          movies: movie,
        },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "mess" });
  }
});

app.delete("/favourites", async (req, res) => {
  const movie = req.body.imdbID;
  const token = req.body.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const _id = user.id;
    await User.updateOne(
      { _id },
      {
        $pull: {
          movies: { imdbID: movie },
        },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "mess" });
  }
});

app.post("/register", async (req, res) => {
  const { login: username, password: plainTextPassword } = req.body;
  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "invalid username" });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("user created", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json(`Username: ${username} is already used!`);
    }
    throw error;
  }
  res
    .status(201)
    .json(`${username}, your account  has been created. You can sign in now`);
});

app.post("/login", async (req, res) => {
  const { login: username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.json({ status: "error", data: "Invalid username/password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 3),
      },
      process.env.JWT_SECRET
    );
    return res.json({ status: "ok", data: token, username: user.username });
  }
  res.json({ status: "error", data: "Invalid username/password" });
});

app.post("/changepassword", async (req, res) => {
  const { token, password: newPassword } = req.body;
  if (!token) {
    return res.status(401).json({ err: "User token missing" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const _id = user.id;
    const password = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { _id },
      {
        $set: { password: password },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "mess" });
  }
});

async function requestCounter(req, res, next) {
  try {
    const reqCount = await Count.findOne({
      _id: "63490d7a647128da4175191d",
    });
    if (reqCount.count < 1000) {
      reqCount.count++;
      await reqCount.save();
      next();
    } else {
      res.status(403).json("Daily request limit reached");
    }
  } catch (e) {
    console.log(e.message);
  }
}
app.use(requestCounter);
=======
app.get("/", (req,res) => {
  res.json("WORKING")
})

app.get('/favourites', async (req, res) => {
    const token = req.query.token
    if (!token) {
      return res.status(401).json({ err: "User token missing" })
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      const _id = user.id
      const document = await User.findOne({ _id }).lean()
      const movies = document.movies
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
      res.status(401).json({ err: "You were loggod out." })
    }
  })

  app.post('/favourites', async (req, res) => {
    const movie = req.body.movie
    const token = req.body.token
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      const _id = user.id
      await User.updateOne(
        { _id },
        {
          $push: {
            movies: movie
          }
        })
      res.json({ status: 'ok' })
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: "mess" })
    }
  })

  app.delete('/favourites', async (req, res) => {
    const movie = req.body.imdbID
    const token = req.body.token
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      const _id = user.id
      await User.updateOne(
        { _id },
        {
          $pull: {
            movies: { imdbID: movie }
          }
        })
      res.json({ status: 'ok' })
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: "mess" })
    }
  })

  app.post("/register", async (req, res) => {
    const { login: username, password: plainTextPassword } = req.body
    if (!username || typeof username !== 'string') {
      return res.json({ status: 'error', error: 'invalid username' })
    }
    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
      const response = await User.create({
        username,
        password
      })
      console.log('user created', response)
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json(`Username: ${username} is already used!`)
      }
      throw error
    }
    res.status(201).json(`${username}, your account  has been created. You can sign in now`)
  })

  app.post("/login", async (req, res) => {
    const { login: username, password } = req.body
    const user = await User.findOne({ username }).lean()
    if (!user) {
      return res.json({ status: 'error', data: "Invalid username/password" })
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({
        id: user._id,
        username: user.username,
        exp: Math.floor((Date.now() / 1000) + 60 * 60 * 3)
      }, process.env.JWT_SECRET)
      return res.json({ status: 'ok', data: token, username: user.username })
    }
    res.json({ status: "error", data: "Invalid username/password" })
  })

  app.post('/changepassword', async (req, res) => {
    const { token, password: newPassword } = req.body
    if (!token) {
      return res.status(401).json({ err: "User token missing" })
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      const _id = user.id
      const password = await bcrypt.hash(newPassword, 10)
      await User.updateOne({ _id }, {
        $set: { password: password }
      })
      res.json({ status: 'ok' })
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: "mess" })
    }
  })

  async function requestCounter(req, res, next) {
    try {
        const reqCount = await Count.findOne( {_id: "63490d7a647128da4175191d"} )
        if( reqCount.count < 1000 ){
            reqCount.count++
            await reqCount.save()
            next()
        } else {
            res.status(403).json("Daily request limit reached")
        }
    } catch (e) {
        console.log(e.message)
    }
  }
  app.use(requestCounter)
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb

  let cachedData;
  let cacheTime;

<<<<<<< HEAD
app.get("/search", (req, res) => {
  if (cacheTime && cacheTime > Date.now() - 1000) {
    cachedData.wait = true;
    return res.json(cachedData);
  }
  const options = {
    method: "GET",
    url: "https://movie-database-alternative.p.rapidapi.com/",
    params: {
      s: req.query.s,
      r: "json",
      page: req.query.page,
      type: req.query.type,
      year: req.query.year,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      cachedData = response.data;
      cacheTime = Date.now();
      response.data.wait = false;
      response.data.cacheTime = cacheTime;
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/movie", (req, res) => {
  const options = {
    method: "GET",
    url: "https://movie-database-alternative.p.rapidapi.com/",
    params: { r: "json", i: req.query.id },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

let cachedNews;
let cachedNewsDate;

app.get("/news", (req, res) => {
  if (cachedNewsDate && cachedNewsDate > Date.now() - 60 * 60 * 1000) {
    cachedNews.requestTime = Date();
    console.log(cachedNews.requestTime);
    return res.status(200).json(cachedNews);
  }

  const options = {
    method: "GET",
    url: "https://movies-news1.p.rapidapi.com/movies_news/recent",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "movies-news1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      cachedNews = { data: response.data };
      cachedNewsDate = Date.now();
      res.status(200).json({ data: response.data });
    })
    .catch(function (error) {
      console.error(error);
    });
});
=======
  app.get("/search", (req, res) => {
    if (cacheTime && cacheTime > Date.now() - 1000) {
      cachedData.wait = true;
      return res.json(cachedData)
    }
    const options = {
      method: 'GET',
      url: 'https://movie-database-alternative.p.rapidapi.com/',
      params: { s: req.query.s, r: 'json', page: req.query.page, type: req.query.type, year: req.query.year },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      cachedData = response.data;
      cacheTime = Date.now();
      response.data.wait = false
      response.data.cacheTime = cacheTime;
      res.json(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  })

  app.get("/movie", (req, res) => {
    const options = {
      method: 'GET',
      url: 'https://movie-database-alternative.p.rapidapi.com/',
      params: { r: 'json', i: req.query.id },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      res.json(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  })
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb
