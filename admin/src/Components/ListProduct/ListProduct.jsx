import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    // Processs === paila code run hunxa tespaxe useffect ma pugera get_product call hunxa  tya bata allproduct ma data janxe ra fere code run hunxa sakeyo process second render ma useffect bata function call hunna hai tesaile ta useffect use greko.

    // Q. why useEffect is not used in AddProduct ?
    //  === In this AddProduct component, the useEffect hook is not necessary because there is no side effect that needs to be run when the component mounts or updates. The main functionality of the component is to allow the user to input product details and upload an image, which is then submitted via a button click. Here’s why useEffect isn’t used in this case:


    // By using useState, you maintain a state variable (allproducts) that React will track. When setAllProducts is called with new data, React will re-render the component with the updated state. The useEffect hook ensures the data fetching side effect runs only once when the component mounts. This combination allows React to efficiently manage component state and side effects, ensuring your UI stays in sync with your data.

    // logic to fetch the data from the api
    const [allproducts, setAllProducts] = useState([])

    // function to fetch the data from api
    const getProduct = async () => {
        try {
            const response = await fetch('http://localhost:8000/products', {
                method: 'GET'
            })

            // When you make a fetch request and receive a response, the response object contains several properties like status, statusText, headers, and most importantly body. To access the JSON data in the response body, you need to call the json() method on the response object
            const responseData = await response.json()

            if (response.ok) {
                console.log('product retrieved', responseData);
                setAllProducts(responseData); // Update the state with fetched data
            } else {
                // Handle error scenario, show error message, etc.
                console.error('Error adding product:', responseData.message);
            }
        } catch (error) {
            console.error('Error retrieving product:', error)
        }
    }


    useEffect(() => {
        getProduct();  // Call the function to fetch products when the component mounts
    }, [])// Empty dependency array ensures this runs only once



    // Function for cross icon to remove products
    const removeProduct = async (id) => {
        await fetch(`http://localhost:8000/products/${id}`, {
            method: 'DELETE',
            // header is not necessary in this case because neither we are accepting or receiving any data
            headers: {
                // This header tells the server that the client (your frontend) expects the response to be in JSON format.
                Accept: 'application/json',
                // This header indicates the format of the data being sent to the server by the client.application/json means that the body of the request contains JSON data.
                'Content-Type': 'application/json',
            },
            // The JSON stringify() method in Javascript takes in a Javascript variable or object as an input and converts it into an equivalent JSON string.
            // // console.log(JSON.stringify({ x: 5, y: 6 }));
            // // Expected output: '{"x":5,"y":6}'
            // body: JSON.stringify({ id: id })
        })
        // here we are calling getProduct() function again because we want to update the list after the deletion of some product
        await getProduct();
    }

    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className='listproduct-allproduct'>
                <hr />
                {allproducts.map((product, index) => {
                    return <> <div key={{ index }} className="listproduct-format-main listproduct-format">

                        <img src={`http://localhost:8000/public${product.image}`} className='listproduct-product-icon' />
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>

                        <img onClick={() => { removeProduct(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}






export default ListProduct;