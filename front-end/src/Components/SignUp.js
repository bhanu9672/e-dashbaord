import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [ name, setName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPasswird ] = useState( "" );
    const [ error,setError ] = useState( false );
    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = localStorage.getItem( "user" );
        if( auth ) {
            navigate( "/" );
        }
    },[]);

    const collectData = async () => {
        console.log( "Btn Click Now." );
        console.warn( name, email, password );
        let result = await fetch( "http://localhost:5000/register", {
            method : 'post',
            body : JSON.stringify({ name, email, password }),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        if( !name || !email || !password  ) {
            setError( true );
            return false;
        }
        result = await result.json();
        localStorage.setItem( "user", JSON.stringify( result ) );
        navigate( "/" );
    }

    return (
        <>
            <div className="register">
                <h3> Register / SignUp Component </h3>
                <input className="inputBox" type="text" placeholder="Enter Name" value={ name } onChange={ (e) => setName( e.target.value ) } />
                { error && !name ? <span className="invalid-input"> Enter Valid Name </span> : "" }
                <input className="inputBox" type="text" placeholder="Enetr Email" value={ email } onChange={ (e) => setEmail( e.target.value ) } />
                { error && !name ? <span className="invalid-input"> Enter Valid Email </span> : "" }
                <input className="inputBox" type="password" placeholder="Enter Password" value={ password } onChange={ (e) => setPasswird( e.target.value ) } />
                { error && !name ? <span className="invalid-input"> Enter Valid Password </span> : "" }
                <button className="appButton" onClick={ collectData }> Sign Up </button>
            </div>
        </>
    )
}

export default SignUp;