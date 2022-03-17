const express = require('express')
const cors = require("cors")
const path = require('path')
const PORT = process.env.PORT || 8081
const { rootCheck, setPNG, getPNG, remPNG } = require("./controllers/png.controller");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const domainsFromEnv = process.env.CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors(corsOptions))
  .get('/', rootCheck)
  .get('/setPNG/donator/:name', setPNG)
  .get('/getPNG/filename/:name', getPNG)
  .get('/remPNG/filename/:name', remPNG)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))