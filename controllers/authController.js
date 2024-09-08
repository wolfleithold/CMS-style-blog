const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .render("register", { error: "Username already exists" });
    }

    // Create the new user with hashed password
    await User.create({
      username,
      password,
    });

    // Redirect to login page
    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("An error occurred.");
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .render("login", { error: "Invalid username or password" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Passwords do not match");
      return res
        .status(400)
        .render("login", { error: "Invalid username or password" });
    }

    // Set session
    req.session.logged_in = true;
    req.session.username = username;

    res.redirect("/");
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .render("login", { error: "An error occurred. Please try again." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
