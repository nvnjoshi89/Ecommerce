import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config.js/db.js'
import product from './routes/product.js'
import cors from 'cors'
import { fileURLToPath } from 'url';
import user from './routes/user.js'


// configure env . hame sanga root ma .env hunale config bhetra path halnu parena
/* dotenv.config() is used to load environment variables from a .env file into process.env.
 Here's how it works:
 Loading the dotenv Module: First, you import the dotenv module, which allows you to work with .env files.
 Configuring Environment Variables: dotenv.config() is a method provided by the dotenv module. When you call dotenv.config(), it reads the .env file from the current directory and parses the contents. It then assigns any variables defined in that file to process.env, making them accessible throughout your Node.js application.*/
dotenv.config()


const app = express();


// using this our react project will connect to express app on 4000 port
app.use(cors())
// Allow requests from localhost:3000 (or your frontend URL)
// const corsOptions = {
//     origin: 'http://localhost:3000', // Replace with your actual frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };

// app.use(cors(corsOptions));

// .....Get the current file's directory..........

// fileURLToPath: This function from the url module converts a file URL to a path. It's necessary because ES modules use URLs to represent file paths.
// path: This module provides utilities for working with file and directory paths.

// 2. Getting the Current Module's Filename
// const __filename = fileURLToPath(import.meta.url);
// import.meta.url: This contains the URL of the current module in ES modules. For example, if your module is located at /home/user/project/server.js, import.meta.url will be 'file:///home/user/project/server.js'.
// fileURLToPath(import.meta.url): This converts the URL provided by import.meta.url into a file path. The result would be /home/user/project/server.js.

// 3. Getting the Current Module's Directory
// const __dirname = path.dirname(__filename);
// path.dirname(__filename): This function returns the directory name of the path specified. Given /home/user/project/server.js, it would return /home/user/project.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use('/static', express.static(path.join(__dirname, '../public')));



//.......... Database config...........
connectDB()


// .........MIDDLEWARE..........

// express.json() is built-in middleware that replaces the need for body-parser's json() middleware. 
// Parsing: Parsing is the act of taking a string of data and converting it into a format that a program can more easily work with. For JSON, this means converting the string into a JavaScript object.
// How express.json() Middleware Works
// 1. Incoming Request: When a client sends a request to your Express server with a JSON payload, the JSON data is sent as a string in the body of the request.
// 2 .Content-Type Header: The request should have a Content-Type header set to application/json, indicating that the body contains JSON data.
// 3. Middleware Activation: The express.json() middleware intercepts the request.
// 4. String Conversion (Parsing): The middleware reads the JSON string from the request body and parses it. This is done using JavaScript's built-in JSON.parse() method.
// 5. Attachment to req.body: The resulting JavaScript object is then attached to the req.body property of the request object. This allows your route handlers to access the data as a JavaScript object rather than a raw string.
// Middleware for parsing application/json and application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// using this our reactjs project connect to expressjs on 4000 port
app.use(cors())

// Define BASE_DIR and BASE_URL
global.BASE_DIR = path.join(__dirname, '../backend/public')
global.BASE_URL = process.env.BASE_URL || 'http://localhost:8000'

// Serve static files
// 1. app.use(...)
// In Express, app.use() is used to mount middleware functions. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can perform tasks such as modifying request and response objects, ending the request-response cycle, or calling the next middleware function in the stack.

// 2. '/public'
// This is the mount path where the middleware function (express.static(BASE_DIR)) will be executed. When a request is made to a URL starting with /public, Express will invoke the middleware function.

// 3. express.static(BASE_DIR)
// express.static() is a built-in middleware function in Express. It serves static files and is based on the serve-static middleware.
// BASE_DIR is the absolute path of the directory that contains the static assets you want to serve. In your case, it's '../backend/public'.
app.use('/public', express.static(BASE_DIR));


// ......Routes............
app.use('/products', product)
app.use('/auth', user)


// ..........API Creation.........


app.get('/', (req, res) => {
    res.send('Welcome to ecommerce app')
})

// PORT
const PORT = process.env.PORT || 8000

// run listen
app.listen(PORT, () => {
    console.log(`server running on port${PORT}`);
})

