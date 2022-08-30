import React from "react";
import { 
    Link, useNavigate
} from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem( 'user' );
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.clear();
        navigate( "/signup" )
    }
    return(
        <>
        <ul className="nav-ul">
            <li> <Link to="/"> Products </Link> </li>
            <li> <Link to="/add"> Add Products </Link> </li>
            <li> <Link to="/update"> Update Products </Link> </li>
            <li> <Link to="/Profile"> Profile </Link> </li>
            <li>
                { auth ? <Link to="/signup" onClick={ LogOut }> LogOut </Link> : <Link to="/signup"> Sign Up </Link> }
            </li>
        </ul>
        </>
    )
}

export default Nav;