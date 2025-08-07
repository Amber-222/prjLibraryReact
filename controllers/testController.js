const healthCheck = async (req, res) => { //declare an asyncrhonous method that returns status 200 when called
    console.log("Everything is OK") //prints to console
    res.status(200).json({status: "OK"}) //returns a status code to the browser

    //res.status expects an http status code 
    //.json expects expects data to pass back to the calling browser or app
};

//EXPOSES THE METHODS LISTED TO THE REST OF THE PROJECT
//same as calling a method public to make other classes access it
module.exports = {
    healthCheck
}