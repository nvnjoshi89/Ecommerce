import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    //logic to display selected image in upload section . setting state varaible
    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",

    })



    // explained in notes. yesma pic select grepaxe euta  event object pauxau hamle tyo bhetra target hunxa target bhetra file hunxa.
    const imageHandler = (e) => {
        setImage(e.target.files[0])
        console.log(e);
    }

    // function to store the details of addproduct
    // [e.target.name] is not actually an array; it's a syntax feature in JavaScript called computed property names. This feature allows you to dynamically set or update a property key in an object using the value of a variable or expression.
    // e.target.name is the name attribute of the input element. This attribute should match a key in the productDetails object.
    // e.target.value is the new value entered by the user in the input field.
    // setProductDetails({
    //     ...productDetails,        // Copies existing properties
    //     [e.target.name]: e.target.value  // Updates the `name` property with "New Product"
    // });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    // function for add button. linking our addproduct to our backend
    // const Add_product = async () => {
    //     let responseData;
    //     let product = productDetails;

    //     let formData = new FormData();
    //     formData.append('product', image);

    //     await fetch('http://localhost:8000/products', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'applicatioin/json'
    //         },
    //         // stringfy convert jsondata into javascript
    //         body: json.stringy(product),
    //     }).then((res) => res.json()).then((data) => { responseData = data.success ? alert("Product Added") : alert("Failed") })


    // }
    const Add_product = async () => {
        try {
            // This initializes a new FormData object, which will hold the key/value pairs representing your form data.
            // Using FormData makes it easier to construct multipart form data without manually encoding and constructing the request.
            // FormData can include file objects, which is essential for uploading files like images.
            const formData = new FormData();
            formData.append('name', productDetails.name);
            formData.append('category', productDetails.category);
            formData.append('new_price', productDetails.new_price);
            formData.append('old_price', productDetails.old_price);
            formData.append('image', image);

            const response = await fetch('http://localhost:8000/products', {
                method: 'POST',
                body: formData,
            });

            // Response Format: When you make a fetch request and receive a response, the response object contains several properties like status, statusText, headers, and most importantly body.

            // Response Body: The actual data you are interested in (like products) resides in the body of the response. However, the body itself is a readable stream, not directly accessible as an object.

            // Parsing JSON: To access the JSON data in the response body, you need to call the json() method on the response object. This method reads the body stream to completion and parses it as JSON, returning a promise that resolves with the JavaScript object representation of the JSON data.


            const responseData = await response.json();

            if (response.ok) {
                console.log('Product added:', responseData.products);
                // Optionally reset form fields or show success message
            } else {
                console.error('Error adding product:', responseData.message);
                // Handle error scenario, show error message, etc.
            }
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle unexpected errors, show error message, etc.
        }
    };


    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>


            <div className="addproduct-price">

                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>

                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => { Add_product() }} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct