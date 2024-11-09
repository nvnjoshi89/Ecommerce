import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import user from '../models/user.js'
import jwt from 'jsonwebtoken';

/**
 * POST /signup
 * create request
 */
// creating the create user endpoint
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // checking user
        const existingUser = await user.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Already Register please login'
            })
        }

        // hash password before storing it to database
        const hashedPassword = await hashPassword(password)

        let cart = {}
        for (let i = 0; i < 300; i++) {
            cart[i] = 0
        }
        // creating user
        const users = await new user({ name, email, password: hashedPassword, cartData: cart }).save()

        res.status(201).json({
            success: true,
            message: 'User Register Successfully',
            users
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in creating user',
            error
        })
    }
}

/**
 * POST /login
 * login Users
 */

// creating the login endpoint
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user by email address
        const users = await user.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email is not registered'
            })
        }

        // check user password
        const isValidPassword = await comparePassword(password, users.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            })
        }
        // Generate access toke and refresh token
        const token = jwt.sign({ _id: users._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30s"
        })
        const refreshToken = jwt.sign({ _id: users._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })

        // store refreshToken in user document
        users.refresh_token = refreshToken;
        await users.save();

        res.status(200).json({
            success: true,
            user: {
                name: users.name,
                email: users.email,
            },
            message: 'Login successfully',
            token,
            refreshToken
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

// Generate new access token on the basis of the refresh token provided from the browser cookie
// export const handleRefreshToken = async (req, res, next) => {
//     try {
//         console.log('handle refresh token is called ');

//         // Get authorization header from request
//         const { authorization } = req.headers;

//         // check if the authorization header is present and starts with "bearer"
//         if (!authorization && authorization.startsWith('Bearer')) {
//             res.status(401)// Unauthorized if no authorization header or invalid format
//         }

//         const refreshToken = authorization.slice(7);
//         const foundUser = await user.findOne({ refresh_token: refreshToken })
//         if (!foundUser) return res.sendStatus(403);// Forbidden

//         // Verify the refresh token using the JWT_SECRET_KEY from the environment variables and the jwt.verify method.
//         // If there is an error during verification or the token is invalid, the callback function will receive an 'err' argument.
//         // If the token is valid, the decoded token data will be passed to the callback function as the 'decoded  ' argument.
//         jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
//             // check for errors during verification or if the user ID in the decoded JWT payload does not match the user's ID
//             if (err || foundUser._id !== decoded._id) return res.sendStatus(403);
//         })

//         //extract the user's email from the foundUser object
//         const email = foundUser.email;

//         // generate a new JWT access token with the user ID and email as the payload and and a 8 hour expiration time

//         const accessToken = jwt.sign({
//             _id: decoded._id,
//             email: decoded.email,
//         },
//             process.env.JWT_SECRET_KEY,
//             { expiresIn: '8h' }
//         );

//         res.json({
//             name: foundUser.name,
//             id: foundUser._id,
//             accessToken: accessToken
//         })

//     } catch (error) {
//         return next(error)
//     }

// }

export const handleRefreshToken = async (req, res, next) => {
    try {
        // Get authorization header from request
        const { authorization } = req.headers;

        // Check if the authorization header is present and starts with "Bearer"
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.sendStatus(401); // Unauthorized
        }

        const refreshToken = authorization.slice(7); // Extract refresh token


        const foundUser = await user.findOne({ refresh_token: refreshToken });
        if (!foundUser) return res.sendStatus(403); // Forbidden if no user found

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err || foundUser._id.toString() !== decoded._id) {
                return res.sendStatus(403); // Forbidden if token is invalid or doesn't match
            }

            // Generate a new JWT access token
            const accessToken = jwt.sign({
                _id: decoded._id,
                email: decoded.email,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '8h' });

            // Send the new access token
            res.json({
                name: foundUser.name,
                id: foundUser._id,
                accessToken: accessToken
            });
        });

    } catch (error) {
        return next(error); // Handle server errors
    }
}

