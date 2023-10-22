import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Card } from 'flowbite-react';

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDertails();
    }, []);

    const getProductDertails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const UpdateProductFun = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-type": "Application/json"
            }
        });
        result = await result.json();
        console.log(result)
        if (result) {
            navigate("/");
        }
    }

    return (
        <>
            <Card className="max-w-lg m-auto">
                <h1 className="text-center text-2xl font-bold font-mono"> Update Product </h1>
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your Name"
                            />
                        </div>
                        <TextInput
                            placeholder="Enter Product Name"
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    {error && !name && <span className="invalid-input"> Enter Valid Name </span>}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Product Price"
                            />
                        </div>
                        <TextInput
                            placeholder="Enter Price"
                            type="number"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </div>
                    {error && !price && <span className="invalid-input"> Enter Valid Price </span>}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Product Category"
                            />
                        </div>
                        <TextInput
                            placeholder="Enter Product Category"
                            type="text"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                        />
                    </div>
                    {error && !category && <span className="invalid-input"> Enter Valid Category </span>}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Product Company"
                            />
                        </div>
                        <TextInput
                            placeholder="Enter Product Company"
                            type="text"
                            value={company}
                            onChange={(e) => { setCompany(e.target.value) }}
                        />
                    </div>
                    {error && !company && <span className="invalid-input"> Enter Valid Company </span>}
                    <Button onClick={UpdateProductFun}>
                        Update Product
                    </Button>
                </form>
            </Card>
        </>
    );
}

export default UpdateProduct;