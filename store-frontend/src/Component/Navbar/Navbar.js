import React from 'react'
import {Link} from "react-router-dom"
function Navbar() {
    return (
        <nav className='navbar'>
            <h1>MVP</h1>
            <div className='nav-links'>
                <Link to='/'>Home</Link>
                <Link to='/customer'>Customer</Link>
                <Link to='/product'>Product</Link>
                <Link to='/store'>Store</Link>
                <Link to='/sale'>Sales</Link>
            </div>
        </nav>
    );
}

export default Navbar;
