// PATH
const path = require("path");

// EXPRESS JS
const express = require("express");

// CONTENT PARSER
const bodyParser = require("body-parser");

// OBJECT DATA MODELING LIBRARY OF MONGODB
const mongoose = require("mongoose");

// EXPRESS SESSION
const session = require("express-session");

// MONGODB SESSION
const MongoDBStore = require("connect-mongodb-session")(session);

// CSRF TOKEN
const csrf = require("csurf");

// MESSAGE FLASHER
const flash = require("connect-flash");

// USED FOR UPLOADING FILES
const multer = require("multer");

// IMPORT ERROR CONTROLLER
const errorController = require("./controllers/error");

// IMPORT USER SCHEMA DB/TABLE
const User = require("./models/user");

// MONGODB CONNECTION STRING
const MONGODB_URI =
  "mongodb+srv://edwincalmajr:12345@cluster.ymb6tkc.mongodb.net/shop";

// EXPRESS JS OBJECT
const app = express();

// SESSION OBJECT
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// CSRF TOKEN OBJECT
const csrfProtection = csrf();

// FILE UPLOAD FOLDER
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
    );
  },
});

// FILE UPLOAD FILTER
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// VIEW TEMPLATES
app.set("view engine", "ejs");
app.set("views", "views");

// IMPORT ROUTES
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// CONTENT PARSER
app.use(bodyParser.urlencoded({ extended: false }));

// FILE UPLOAD
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
);

// VIEW TEMPLATES
app.use(express.static(path.join(__dirname, "public")));

// STATIC IMAGES
app.use("/images", express.static(path.join(__dirname, "images")));

// CSRF TOKEN SESSION
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

// INIT CSRF
app.use(csrfProtection);
app.use(flash());

// SESSION CONTROLLER
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// USER SESSION VERIFICATION CONTROLLER
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// INIT ROUTES
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// SERVER SIDE ERROR
app.get("/500", errorController.get500);

// CLIENT SIDE ERROR
app.use(errorController.get404);

// SERVER SIDE ERROR CONTROLLER
app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

// INITIALIZE DB AND SERVER
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
