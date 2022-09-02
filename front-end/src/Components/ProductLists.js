import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductLists = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }

    const deteleProduct = async (id) => {
        console.log(id)
        let result = await fetch(`http://localhost:5000/product/${id}` , {
            method : "Delete"
        });
        result = await result.json();
        if( result ) {
            //alert( "Product Deleted" );
            //console.log( "Product Deleted" );
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        console.warn( event.target.value );
        let key = event.target.value;

        if( key ) {
            let result = await fetch( `http://localhost:5000/search/${key}` );
            result = await result.json();
            if( result ) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }


    return (
        <div className="products-list">
            <h3> Product List </h3>
            <input type="" className="search-product-box" placeholder="Enter Search Product" 
            onChange={ searchHandle } />
            <ul>
                <li> S.No </li>
                <li> Name </li>
                <li> Price </li>
                <li> Category </li>
                <li> Company </li>
                <li> Operation </li>
            </ul>
            {
            products.length > 0 ?  
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li> {index + 1} </li>
                        <li> {item.name} </li>
                        <li> {item.price} </li>
                        <li> {item.category} </li>
                        <li> {item.company} </li>
                        <li> 
                            <button onClick={() => deteleProduct(item._id)}> Delete </button> 
                            <Link to={ "/update/"+item._id}> update </Link>
                        </li>
                    </ul>
                )
            : <h1 className="no-product-found"> No Search Product Found. </h1>
            }
        </div>
    )
}

export default ProductLists;