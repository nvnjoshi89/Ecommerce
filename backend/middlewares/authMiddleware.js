import jwt from 'jsonwebtoken'
import User from '../models/user.js' // Assuming your user model is in this path

const authMiddleware = async (req, res, next) => {
    try {

        // Get authorization header from request

        const { authorization } = req.headers;
        // Firstly, set request user to null
        req.user = null;

        // Check if the authorization header is present and starts with "Bearer "

        if (authorization && authorization.startsWith('Bearer ')) {

            // Extract the token part
            // const token = authorization.slice(7, authorization.length);
            const token = authorization.slice(7);

            // Verify token and get token data
            const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // Find the user associated with the token
            const user = await User.findById(tokenData._id)
            if (!user) {
                console.log('User not found for token ID:', tokenData._id);
                throw new Error('User not found');
            }
            // Attach the user to the request object
            req.user = user;

        }
        // Proceed to the next middleware or route handler

        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

export default authMiddleware;
