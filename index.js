const express = require('express');
const path = require('path');

const { connectToMongodb } = require("./connection");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

// mongodb connection
connectToMongodb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("Mongodb connected!"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// route
app.use(checkForAuthentication);
app.use("/url", restrictTo(['Normal', 'Admin']), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);


// authentication - signup, login, logout

// types of authentication =>
// stateful authentication - session (✅), :: memory intensive, uuid is stored on server, good for bank apps,
// stateless authentication - jwt, token (✅), cookie, header, localstorage, :: longer expiry time, no need to store on server, good for social media,
//      Token - 
// 1. In cookie : JWT token =>  res.cookie('token', token) | req.cookies.token :: only for browsers
// 2. In response header : Bearer token => authentication: Bearer <token> :: on any device

// authorization - admin, user 



app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;

