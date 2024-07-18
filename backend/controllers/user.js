import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import user from '../models/user.js'
import jwt from 'jsonwebtoken';

/**
 * POST /signup
 * create request
 */

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

    }
}

/**
 * POST /login
 * login Users
 */

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
        // Generate and return tokem
        const token = jwt.sign({ _id: users._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })

        res.status(200).json({
            success: true,
            user: {
                name: users.name,
                email: users.email
            },
            message: 'Login successfully',
            token
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