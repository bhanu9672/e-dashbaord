import React from "react";
import {
    Link, useNavigate
} from "react-router-dom";
import Logo from "../logo.png"

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div className="nav-section">
            <Link to="/">
                <img src={Logo} alt="Logo" className="logo" />
            </Link>
            {
                auth ?
                    <ul className="nav-ul">
                        <li> <Link to="/"> Products </Link> </li>
                        <li> <Link to="/add"> Add Products </Link> </li>
                        <li> <Link to="/Profile"> Profile </Link> </li>
                        <li><Link to="/signup" onClick={LogOut}> LogOut ( {JSON.parse(auth).name} ) </Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li><Link to="/signup"> Sign Up </Link></li>
                        <li> <Link to="/login"> Login </Link> </li>
                    </ul>
            }
        </div>
    );
}

export default Nav;