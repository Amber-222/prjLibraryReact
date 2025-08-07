const express = require('express')
const testController = require('../controllers/testController.js')
//.. means go back to the root of the project and into the controllers folder to find the testController class

//set up a singleton for the router
const router = express.Router(); 

//router.get specifies what type of request is gonna be executed
//the route to follow and which method to call from where
router.get('/healthCheck', testController.healthCheck)

//exporting our map/router to call it in the main file so the user can get to this route
module.exports = router