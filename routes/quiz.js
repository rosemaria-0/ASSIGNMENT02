// Import express and create a router object
const express = require("express");
const router = express.Router();
const Quizzes = require("../models/quizzes");
const Course = require("../models/course"); // Corrected the model name

// GET handler for /quiz/index to render the index page
router.get("/", (req, res, next) => {
  Quizzes.find()
    .exec()
    .then((quiz) => {
      res.render("quiz/index", {
        title: "Quiz App",
        dataset: quiz,
      });  
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

// GET handler for /quiz/add to render the add page
router.get("/add", (req, res, next) => {
  Course.find()
    .sort({ name: 1 })
    .exec()
    .then((courses) => {
      res.render("quiz/add", {
        title: "Add a new Question",
        courses: courses, // Fix the variable name to 'courses'
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

// POST handler for /quiz/add to handle form submission
router.post("/add", async (req, res, next) => {
  try {
    // Use mongoose model with the info from the form
    const newQuizzes = await Quizzes.create({
      name: req.body.name,
      duedate: req.body.duedate,
      course: req.body.course,
    });
    res.redirect("/quiz"); // Redirect to the index page after successful form submission
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//get handler for quiz/delete
router.get("/delete/:_id", async (req, res, next) => {
  try {
    await Quizzes.deleteOne({ _id: req.params._id });
    res.redirect("/quiz");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
//get handler for quiz/edit
router.get("/edit/:_id", async (req, res, next) => {
  try {
    const quiz = await Quizzes.findById(req.params._id).exec();

    if (!quiz) {
      res.status(404).send("Quiz not found");
      return;
    }

    const courses = await Course.find().sort({ name: 1 }).exec();

    res.render("quiz/edit", {
      title: "Edit a Quiz",
      quiz: quiz,
      courses: courses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


// Export the router object to make it available in the app
module.exports = router;
