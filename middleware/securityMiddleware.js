//cors: look at configuration options for express api
//csurf: how it helps with csrf attavks and configures for a node.js api
//helmet: how it helps with header protections with click jacking
//rate limiting, brute force prevention and libraries to include for this node.js api
const helmet = require('helmet') //import helmet after running nmp i helmet in terminal
const securityMiddleware = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'default-src': ["'self'"], //allows scripts from the website itself but nowhere else
                'frame-ancestors': ["'none'"] //prevents this webiste from being embedded in another website to prevent clickjacking
            }
        }
    }))
}