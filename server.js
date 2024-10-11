const express = require("express");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/database");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup

const hbs = exphbs.create({
  helpers: {
    formatDate: function (date) {
      return new Date(date).toLocaleDateString();
    },
    excerpt: function (content) {
      return content.substring(0, 100) + "...";
    },
  },
});

router.get("/", blogController.getHomePage);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use(authRoutes);
app.use(blogRoutes);

const PORT = process.env.PORT || 3001;

// Database Sync
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
