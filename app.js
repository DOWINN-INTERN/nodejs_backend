// Import Directory
const path = require("path");

// Import Express
const express = require("express");

// Import BodyParser
const bodyParser = require("body-parser");

// Import 404 Controller
const errorController = require("./controllers/error");

// Import UTIL DB Connector
const sequelize = require('./util/database');

// Initialize View Template
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// Set Page Routes (Controller)
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// HTTP Request Parser (Middleware)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// RUN APP
sequelize
    .sync()
    .then((result) => {
        console.log(result);
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
