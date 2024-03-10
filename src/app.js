const helmet = require("helmet");
const compression = require("compression");
const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("./configs/index");
const sesson = require('express-session');
const cors = require('cors');
// init middleware
app.use(helmet()); // secure app by setting various HTTP headers
app.use(compression()); // compress all responses
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// config cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
}));
// config morgan
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat)); // log requests to the console
// init loger
const logger = require("./services/logger.service");
// init global variable
global.config = config;
global.logger = logger;
// init route
app.use("/v1/api", require("./routes/index"));
// init db
require("./dbs/init.mongoDB");
// init cloud
require('./configs/cloudinary.config');
// init session
app.use(sesson({
    secret: 'abc',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// init passport
const passport = require('./configs/passport.config');
// init passport
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    return res.json({
        req: req
    })
});

// require('./configs/supabase.config');
// require('./configs/mail.config');



module.exports = app;
