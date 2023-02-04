import session from 'express-session'
import MongoStore from 'connect-mongo'
require('dotenv').config()

const sessionOptions = session({
  secret: 'HBkjhbGKnbg33ccsxs22gbhFUKBGcrrvjhjvgvnjkjjvgvRRCdxhbJHNhV',
  store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

export default sessionOptions
