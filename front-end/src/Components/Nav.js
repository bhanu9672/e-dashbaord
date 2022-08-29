import React from "react";
import { 
    Link
} from "react-router-dom";

const Nav = () => {
    return(
        <>
        <ul className="nav-ul">
            <li> <Link to="/"> Products </Link> </li>
            <li> <Link to="/add"> Add Products </Link> </li>
            <li> <Link to="/update"> Update Products </Link> </li>
            <li> <Link to="/LogOut"> LogOut </Link> </li>
            <li> <Link to="/Profile"> Profile </Link> </li>
            <li> <Link to="/signup"> SignUp </Link> </li>
        </ul>
        </>
    )
}

export default Nav;