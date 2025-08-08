//app.js is like the program.cs file in mvc

const express = require('express'); //calling express to be used throughout the app
require(`dotenv`).config()
const port = process.env.API_PORT || 3001 //default passed if no value is specified

//call in our router
const testRoutes = require('./routes/testRoutes.js')

const app = express(); //runs express with default parameters

app.use(express.json()) //interpret json going in and sending back out, imports json middleware to allow json in app

//prints out to console when a request is passed to the api to see which endpoitn is called
//looks at request, generates a response and handles next incoming request
app.use((req, res, next) => { //using parameters and then execute the next lines of code
    console.log(`${req.method} ${req.url}`); //prints out the method and url of the request to the console (terminal)
    next(); //prepare to handle the next incoming request
})

//version our api so that breaking changes can live in a new version
//then specify an area for the routes to live in
//finally point the app to where the routes live
app.use('/v1/test', testRoutes) //go look in the testRoutes to see if the function the user calls actually exists

app.listen(3001, () => {
    console.log(`The API is lisetning on port ${port}`); //prints out to the console that the API is listening on port 3000
})

