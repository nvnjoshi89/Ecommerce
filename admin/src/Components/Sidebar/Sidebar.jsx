import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'


// We will mount this sidebar in admin page
const Sidebar = () => {
    return (
        <div className='sidebar'>
            {/* we add all two section using that we can navigate to add product or list product */}
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt="" />
                    <p>Add product</p>
                </div>
            </Link>

            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={list_product_icon} alt="" />
                    <p>product List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar