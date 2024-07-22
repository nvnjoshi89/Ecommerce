import product from "../models/product.js"

/**
 * GET /newcollections
 * newcollections request
 * creating endpoint for newcollection data
 */

export const getNewCollection = async (req, res) => {
    try {
        const products = await product.find();
        // it will give recently added 8 product
        // let products = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        // products.slice(1) results in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].
        // Applying .slice(-8) to this array results in [5, 6, 7, 8, 9, 10, 11, 12].
        let newCollection = products.slice(1).slice(-8)
        return res.status(200).json(newCollection)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in getting new collection',
            error
        })
    }
}