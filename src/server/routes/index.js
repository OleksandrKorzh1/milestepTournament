const express = require('express');
const bodyParser = require('body-parser');
const { env } = require('../../config');
const auth = require('./auth/index');
const users = require('./users');
const groups=require('./groups')
const swagger = require('../../utils');
const {authenticateToken, errorHandler} = require('../middlewares');
const constants = require('../../utils/constants');
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
const profile=require('./profile')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.engine("hbs", exphbs.engine(
    {
      layoutsDir: "views",
      extname: "hbs"
    }
))

app.set('view engine', 'hbs');
app.get('/', function (req, res) {
  res.render('home');
})

app.use('/auth/login', auth.login);
app.use('/auth/register', auth.register);

if ( env === constants.env.dev ) {
  app.use(
    '/api/docs',
    swagger.swaggerUI.serve,
    swagger.swaggerUI.setup(swagger.swaggerDocs)
  );
}

app.use(authenticateToken);

app.use('/users',users);
app.use('/index',groups);
app.use('/profile',profile);
app.use((req, res) => res.status(404)
  .send({error: `Page not found ${req.path}`}));
app.use(errorHandler);

module.exports = app;


