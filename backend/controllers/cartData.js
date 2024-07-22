
import user from '../models/user.js'

/**
 * POST /cartdata
 * cart data post request
 * creating endpoint for adding products in cartdata
 */

export const createCartData = async (req, res) => {
    try {
        let users = await user.findOne({ _id: req.user.id })

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        console.log(req.body);
        // Increment the cartData for the given itemId
        users.cartData[req.body.itemId] += 1;

        // Save the updated user document  // Update cartData for the given itemId
        const updatedUser = await user.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: users.cartData },
            { new: true }
        );

        console.log(users);
        res.status(200).json({
            success: 'true',
            message: 'cart data added',
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in creating cart data',
            error
        })
    }

}
/**
 * POST /cartdata/remove
 * cart data post request
 * creating endpoint for adding products in cartdata
 */

export const removeCartData = async (req, res) => {
    try {
        let users = await user.findOne({ _id: req.user.id })

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        // decrement in the cartData for the given itemId
        users.cartData[req.body.itemId] -= 1;

        // Save the updated user document  // Update cartData for the given itemId
        const updatedUser = await user.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: users.cartData },
            { new: true }
        );

        res.status(200).json({
            success: 'true',
            message: 'cart data removed',
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in removing cart data',
            error
        })
    }

}

/**
 * GET /cartdata
 * cart data get request
 * creating endpoint for getting products in cartdata
 */

export const getCartData = async (req, res) => {
    try {
        let users = await user.findOne({ _id: req.user.id })

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json(users.cartData)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching cart data',
            error
        })
    }

}