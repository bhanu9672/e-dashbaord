import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo.png"
import { Navbar,Button } from 'flowbite-react';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.clear();
        navigate("/login")
    }
    return (
        <>
            <Navbar className='mb-10' fluid rounded>
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
                                <Link to="/" active> Products </Link>
                                <Link to="/add"> Add Products </Link>
                                <Link to="/Profile"> Profile </Link>
                                <Link to="/login" onClick={LogOut}> LogOut ( {JSON.parse(auth).name} ) </Link>
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