//cors: look at configuration options for express api
//csurf: how it helps with csrf attavks and configures for a node.js api
//helmet: how it helps with header protections with click jacking
//rate limiting, brute force prevention and libraries to include for this node.js api
const helmet = require('helmet') //import helmet after running nmp i helmet in terminal
const cors = require('cors') //import cors after running npm i cors in terminal

const corsOptions = {
    origin: '*', //'https://localhost:3000' //where your frontend is hosted
    methods: ['GET', 'POST', 'PUT', 'DELETE'], //specify requests users can use from frontend
    credentials: true //allowing flow of credentials betweem api and front end web portal
}

const securityMiddleware = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'default-src': ["'self'"], //allows scripts from the website itself but nowhere else
                'frame-ancestors': ["'none'"] //prevents this webiste from being embedded in another website to prevent clickjacking
            }
        },
        featurePolicy: {
            features: {
                geolocation: ["'none'"], //block access to location apis in website, prevents access to physical devices
                microphone: ["'none'"]
            }
        },
        hidePoweredBy: true, //stop api from revealing it is an express api making it harder to look up vulnerabilities
        frameguard: { //prevent website from being put in an iframe 
            action: 'deny'
        },
        ieNoOpen: true
    }))

    app.use(cors(corsOptions))
}

module.exports = {securityMiddleware}