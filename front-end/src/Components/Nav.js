import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo.png"
import { Navbar, Button } from 'flowbite-react';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.clear();
        navigate("/login")
    }
    return (
        <>
            <Navbar className='mb-10 bg-gray-50 text-gray-600' fluid rounded>
                <Link to="/">
                    <img className="w-10" src={Logo} />
                </Link>
                <div className="flex md:order-2">
                    <Button>Get started</Button>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    {
                        auth ?
                            <>
                                <Link to="/store"> Store </Link>
                                <Link to="/" active> Products </Link>
                                <Link to="/add"> Add Products </Link>
                                <Link to="/profile"> Profile </Link>
                                <Link to="/cart"> Cart </Link>
                                <Link to="/checkout"> Checkout </Link>
                                <Link to="/login" onClick={LogOut}>
                                    LogOut ( {JSON.parse(auth).name} )
                                </Link>
                            </>
                            :
                            <>
                                <Link to="/signup">SignUp</Link>
                                <Link to="/login">Login</Link>
                            </>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Nav;