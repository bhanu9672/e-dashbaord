import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, Label, TextInput, Card } from 'flowbite-react';

const ProductLists = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const ProductsList = products.length > 0 && products.map(function (data, index) {
        if (data.img) {
            const blob = new Blob([Int8Array.from(data.img.data.data)], { type: data.img.contentType });
            var image = window.URL.createObjectURL(blob);
        }
        return (
            <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data._id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <Link to={`/product/${data._id}`}> {data.name} </Link>
                    </Table.Cell>
                    <Table.Cell>
                        {data.price}
                    </Table.Cell>
                    <Table.Cell>
                        {data.category}
                    </Table.Cell>
                    <Table.Cell>
                        {data.company}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={`/product/${data._id}`}>
                            {data.img && <img width="60" height="60" src={image} />}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>
                        <button
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => deteleProduct(data._id)}
                        > Delete
                        </button>
                        <Link
                            to={"/update/" + data._id}
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                        >
                            Edit
                        </Link>
                    </Table.Cell>
                </Table.Row>
            </>
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
        <>
            <h3 className="text-center text-2xl font-bold font-mono pb-4"> Product List </h3>
            <TextInput
                color="gray"
                className="pb-10 w-1/4 m-auto"
                placeholder="Enter Search Product"
                onChange={searchHandle}
            />
            <Table striped className="m-auto w-11/12">
                <Table.Head>
                    <Table.HeadCell>
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Price
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Category
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Company
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Image
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Operation
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        products.length > 0 ?
                            ProductsList
                            : <h1 className="no-product-found">
                                No Search Product Found.
                            </h1>
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default ProductLists;