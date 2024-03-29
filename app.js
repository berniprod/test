var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./api/index');
var usersRouter = require('./api/user');
const Categorie=require('./api/categorie');
const Product=require('./api/product');

const Publication=require('./api/publication');
const passport = require('passport');

// require('dotenv').config()
// var app = express();



// //mongoDb connexion
// mongoose.set('useCreateIndex', true)
// mongoose.connect(process.env.DB_CONNEXION_STRING, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('Connected to MongoDB')
// })
// app.use('/uploads', express.static('uploads'));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// //CORS bypass
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// //initializes the passport configuration.
// app.use(passport.initialize());
// //imports our configuration file which holds our verification callbacks and things like the secret for signing.

// require('./config/passport-config')(passport);


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// // using the middleware into the app
// app.use('/categorie',Categorie)
// app.use('/product',Product)
// app.use('/publication',Publication)

const app=express()
const port =process.env.PORT || 5000;

app.use(express.json())
mongoose.connect("mongodb://localhost:27017/app1",{useNewUrlParser:true,useCreateIndex:true})

const connection=mongoose.connection
connection.once('open',()=>{
    console.log("Mongodb database connection successfully")
})
app.use('/categorie',Categorie)
app.use('/product',Product)

app.use('/upload',express.static('upload'))


app.listen(port ,()=>{
    console.log(`server is runing on port ${port}`)
 })



 module.exports = {app};