import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductLists = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const ProductsList = products.length > 0 && products.map(function (data, index) {
        if(data.img) {
        const blob = new Blob([Int8Array.from(data.img.data.data)], { type: data.img.contentType });
        var image = window.URL.createObjectURL(blob);
        }
        return (
            <ul key={data._id}>
                <li> {index + 1} </li>
                <li> {data.name} </li>
                <li> {data.price} </li>
                <li> {data.category} </li>
                <li> {data.company} </li>
                { data.img && <li> <img width="60" height="60" src={image} /> </li> }
                
                <li>
                    <button onClick={() => deteleProduct(data._id)}> Delete </button>
                    <Link to={"/update/" + data._id}> update </Link>
                </li>
            </ul>
        );
    })

    console.log(products)





    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }

    const deteleProduct = async (id) => {
        console.log(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (e) => {
        console.warn(e.target.value);
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
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
                onChange={searchHandle} />
            <ul>
                <li> S.No </li>
                <li> Name </li>
                <li> Price </li>
                <li> Category </li>
                <li> Company </li>
                <li> Image </li>
                <li> Operation </li>
            </ul>
            { 
            products.length > 0 ?
            ProductsList
            : <h1 className="no-product-found"> 
            No Search Product Found. 
            </h1>
            }
        </div>
    )
}

export default ProductLists;