const healthCheck = async (req, res) => { //declare an asyncrhonous method that returns status 200 when called
    console.log("Everything is OK") //prints to console
    res.status(200).json({status: "OK"}) //returns a status code to the browser

    //res.status expects an http status code 
    //.json expects expects data to pass back to the calling browser or app
};

//new method
const greeter = async (req, res) => {
    //get input from the response body
    const userName = req.body.userName

    if (!userName) { //no usernamae passed
        console.log('Please enter soemthing valid')
        res.status(418).json({error: "Invalid or missing input"}) //return error teapot (418) and indicate no input given by user
    }

    res.status(200).json({greeting: `Hello, ${userName}!`}) //or just print the username back in the greeting message
}
//`` for when you call a variable in the string print out
//"" for direct text

//EXPOSES THE METHODS LISTED TO THE REST OF THE PROJECT
//same as calling a method public to make other classes access it
module.exports = {
    healthCheck,
    greeter
}