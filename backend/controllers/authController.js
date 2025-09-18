const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { invalidateToken } = require('../middleware/authMiddleware.js')
const User = require('../models/userModel.js')

//helper method to generate tokens and takes in username
const generateJwt = (username) => {
    //signs it using the scret in env file
    return jwt.sign(username, process.env.JWT_SECRET, {
        expiresIn: '1h' //expiring in 1 hour from creatuion
    })
}

const register = async (req, res) => {
    //pull required info from incoming request
    const { username, password } = req.body
    //before signing user up, check if username already used
    const exists = User.findOne({username: username})
    //if so, say no
    if (exists) return res.status(400).json({message: "User already exists."})

    //if not, hash the password
    const hashedPassword = bcrypt.hash(password, 10)

    try {
        User.create({username: username, password: hashedPassword})
        res.status(200).json({token: generateJwt(username)})
    }
    catch (e) {
        res.status(500).json({error: e.message})
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    const exists = User.findOne({username: username})

    //if not, reject and tell them to try again
    if (!exists) return res.status(400).json({message: "Invalid credentials"})

    //if user exists, compare their crednetials
    const matching = await bcrypt.compare(password, exists.password)

    //if not matched, reject
    if (!matching) return res.status(400).json({message: "Invalid credentials"})
    //else generate token and login
    res.status(200).json({token: generateJwt(username)})
    
}

const logout = async(req, res) => {
    const authHeader = req.authHeader['authorization'] //strip header for token value
    const token = authHeader.split(" ")[1]
    if (!token) return res.status(400).json({message: "You need to be logged in before you can log out"}) //check if there is a token, if not error
    invalidateToken(token) //else handle blacklisting it
    res.status(200).json({message: "Logged out successfully"}) //when succesful, log them out
}

module.exports = {register, login, logout}