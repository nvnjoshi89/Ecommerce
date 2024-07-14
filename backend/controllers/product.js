import fs from 'fs'
import multer from 'multer'
import product from '../models/product.js'
import path from 'path'

/**
 * Upload Document
 * limit:5mb
 *  filter:pdf,jpeg
 */

// configure multer storage and filter options
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${BASE_DIR}/documents/temp`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
        // use current timestamp to prevent duplicate filenames
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype == 'application/pdf' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// create multer instance with specified options
const upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 2024 * 1024 * 5
    },
    fileFilter: multerFilter
})

// middlleware funtion to hanlde multiple upload
export const uploadProductDocument = upload.single('image')

/**
 * 
 * POST /products
 * Create product request 
 */
export const createProduct = async (req, res) => {
    try {
        // Retrieve file path and other relevant data from request object
        const productFilePath = req.file.path
        const permanentFilePath = `/documents/productDocument/${Date.now() + req.file.originalname}`

        // To retrieve id automatically so that we have to not put in req.body
        const productData = await product.find();
        let id;
        if (productData.length > 0) {
            let last_product_array = productData.slice(-1)
            let last_product = last_product_array[0]
            id = last_product.id + 1

        } else {
            id = 1;
        }
        const { name, category, new_price, old_price } = req.body
        const products = await new product({
            id,
            name, image: permanentFilePath, category, new_price, old_price
        }).save()
        // Move uploaded file to permanent location on server
        fs.renameSync(productFilePath, `${BASE_DIR}${permanentFilePath}`)
        res.status(201).json({ products, BASE_URL })
    } catch (error) {
        // Delete uploaded file if an error occurs during database creation
        fs.unlinkSync(req.file.path);
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        })
        // Handle unexpected errors, show error message, etc.
        console.error('Error adding product:', error);
    }

}



/**
 * GET /products/:id
 * get product by id request
 */
export const getProductById = async (req, res) => {
    try {
        const { id: productId } = req.params
        const products = await product.findOne({ id: productId });
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error
        })
    }
}

/**
 * GET /products
 * get product request
 */


export const getProduct = async (req, res) => {
    try {
        const products = await product.find();
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error
        })
    }
}

/**
 * DELETE /products/:id
 * delete products
  */

export const deleteProductById = async (req, res) => {
    try {
        const { id: productId } = req.params
        const products = await product.findOneAndDelete({ id: productId })
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        return res.status(204).json({
            deleted: true
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in deleting product',
            error
        })
    }
}


