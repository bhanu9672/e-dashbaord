import React, { useState } from "react";

const AddProduct = () => {

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ img, setImage ] = useState('');
    const [ error,setError ] = useState( false );

    const addProduct = async (e) => {
        e.preventDefault();
        if( !name || !price || !category || !company || !img ) {
            setError( true );
            return false;
        }
        console.log( name, price, category, company, img );
        const userId = JSON.parse( localStorage.getItem( "user" ))._id;
        console.log( userId );
        let result = await fetch( "http://localhost:5000/add-product",  {
            method : "post",
            body : JSON.stringify({ name,price,category,company,userId, img }),
            headers : {
                "Content-type" : "application/json",
                "Content-type" : "image/png"
            }
        });
        result = await result.json();
        console.log( result );
    }

    return(
        <div className="product">
            <h1> Add Product </h1>
            <form action="http://localhost:5000/add-product" method="post" encType="multipart/formdata">
            <input type="text" placeholder="Enter Product Name" className="inputBox" value={ name } onChange={ (e) => { setName( e.target.value ) } } />
            { error && !name ? <span className="invalid-input"> Enter Valid Name </span> : "" }
            <input type="text" placeholder="Enter Product Price" className="inputBox" value={ price } onChange={ (e) => { setPrice( e.target.value ) } } />
            { error && !price ? <span className="invalid-input"> Enter Valid Price </span> : "" }
            <input type="text" placeholder="Enter Product Category" className="inputBox" value={ category } onChange={ (e) => { setCategory( e.target.value ) } } />
            { error && !category ? <span className="invalid-input"> Enter Valid Category </span> : "" }
            <input type="text" placeholder="Enter Product Company" className="inputBox" value={ company } onChange={ (e) => { setCompany( e.target.value ) } } />
            { error && !company ? <span className="invalid-input"> Enter Valid Company Name </span> : "" }

            <input 
            type="file" 
            accept=".png, .jpg, .jpeg"
            name="img"
            onChange={ (e) => setImage(e.target.files[0] ) } 
            />
            { error && !img ? <span className="invalid-input"> please, upload image </span> : "" }

            <button onClick={ addProduct } className="appButton"> Add Product </button>
            </form>



        </div>
    );
}

export default AddProduct;