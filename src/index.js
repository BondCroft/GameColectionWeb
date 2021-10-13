//dependecies
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const { database } = require('./keys');


//initialization
const app = express();


//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //le indico a node donde esta la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'colectionSession',
    resave: false,
    saveUninitialized: false,
    store: mysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global variables
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    next();
});

//routers
app.use(require('./routes/indexRoutes.js'));
app.use(require('./routes/autentications.js'));
app.use('/content', require('./routes/content.js'));

//public

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});