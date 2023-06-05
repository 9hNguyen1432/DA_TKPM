const express = require("express");
const hbs = require("express-handlebars");
const routes = require('./routers');
const path = require('path')
const session = require('express-session');
const morgan=require('morgan')


// Router
//const appRoute = require('./routers/app.r.js');
// End Router

const app = express();
const port = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

require("./config/hbs")(app);

//HTTP logger
app.use(morgan('dev'));

const oneDay = 1000 * 60 * 60 * 24;
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))

//HBS
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir  : [
        path.join(__dirname, '/views/partials')
    ]
}));


routes(app)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));