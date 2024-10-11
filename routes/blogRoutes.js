const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Home route to render homepage with blog posts
router.get("/", blogController.getHomePage);

module.exports = router;
