import React, { useState } from "react";

const SignUp = () => {

    const [ name, setName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPasswird ] = useState( "" );

    const collectData = () => {
        console.log( "Btn Click Now." );
        console.log( "This is Console Log Data Show" + name, email, password );
        console.warn( name, email, password );
    }


    return (
        <>
            <div className="register">
                <h3> Register / SignUp Component </h3>
                <input className="inputBox" type="text" placeholder="Enter Name" value={ name } onChange={ (e) => setName( e.target.value ) } />
                <input className="inputBox" type="text" placeholder="Enetr Email" value={ email } onChange={ (e) => setEmail( e.target.value ) } />
                <input className="inputBox" type="password" placeholder="Enter Password" value={ password } onChange={ (e) => setPasswird( e.target.value ) } />
                <button className="appButton" onClick={ collectData }> Sign Up </button>
            </div>
        </>
    )
}

export default SignUp;