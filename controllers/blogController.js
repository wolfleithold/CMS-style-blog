const { Post, User } = require("../models/User"); // Adjust the path based on your structure

// Controller to handle home route
const getHomePage = async (req, res) => {
  try {
    // Fetch all blog posts and include associated user (author)
    const postsData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    // Map the data to plain objects
    const posts = postsData.map((post) => post.get({ plain: true }));

    // Render the homepage with posts and loggedIn status
    res.render("home", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
};

module.exports = {
  getHomePage,
};
