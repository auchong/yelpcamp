var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    

//create yelpcamp db in mongodb
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://austin:abc123@ds159998.mlab.com:59998/auchong_yelpcamp");

//js to call body parser package - used to parse variables from post request
app.use(bodyParser.urlencoded({extended: true}));
//used so ejs is not required after file names
app.set("view engine", "ejs");
//using the public folder which holds css and front-end js files
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database


// passport configuration
app.use(require("express-session")({
    secret: "Once again Zorro wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass the currentuser data (if it exists) to every route, as a middleware
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp Server Started');
});