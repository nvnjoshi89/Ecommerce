
import product from "../models/product.js"

/**
 * GET /popularinwomens
 * popular in women request
 * creating end point for popular in women products
 */




export const getPopularInWomen = async (req, res) => {
    try {
        // searcing products based on category
        const products = await product.find({ category: 'women' })
        // let products = [a, b, c, d, e, f, g, h];
        // products.slice(0, 4) results in [a, b, c, d].
        let popularInWomen = products.slice(0, 4)
        return res.status(200).json(popularInWomen)
    } catch (error) {
        console.log('error in fetching popular in women data', error);
    }


}