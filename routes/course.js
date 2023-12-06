const express = require("express");
const router = express.Router();
const Course = require("../models/course");

//get handlers for /courses/
router.get("/", (req, res, next) => {
  Course.find()
    .exec()
    .then((courses) => {
      res.render("courses/index", {
        title: "Courses",
        dataset: courses,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

//Get handler for /courses/add
router.get('/add', (req, res, next) => {
  res.render("courses/add", { title: "Add new Course" });
    
});

//post handler for /flashcard/add
router.post("/add", async (req, res, next) => {
  try {
    // Use mongoose model with the info from the form
    const newCourse = await Course.create({
      name: req.body.name,
    });
    res.redirect("/courses"); // Redirect to the index page after successful form submission
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router object to make it available in the app
module.exports = router;
  