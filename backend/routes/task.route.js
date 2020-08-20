let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

// Task Model
let taskSchema = require('../models/Task');

// CREATE Task
router.route('/create-task').post((req, res, next) => {
  taskSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Tasks
router.route('/').get((req, res) => {
  taskSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = router;