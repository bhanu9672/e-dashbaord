import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Card } from 'flowbite-react';

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const [picture, setPicture] = useState({});
    const navigate = useNavigate();

    const uploadPicture = (e) => {
        setPicture({
            /* contains the preview, if you want to show the picture to the user
                 you can access it with this.state.currentPicture
             */
            picturePreview: URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile: e.target.files[0],
        });
    };

    const HandleAddProduct = async (e) => {
        e.preventDefault();
        console.log(picture.pictureAsFile)
        if (!name || !price || !category || !company || picture.pictureAsFile == undefined ) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("company", company);
        formData.append("file", picture.pictureAsFile);
        for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }
        const data = await fetch("http://localhost:5000/add-product", {
            method: "post",
            //headers: { "Content-Type": "multipart/form-data" },
            body: formData,
        });
        const response = await data.json();
        if (response) {
            console.log(response)
            console.log("Successfully uploaded image");
            navigate("/");
        } else {
            console.log("Error Found");
        }
    };

    return (
        <>
            <Card className="max-w-lg m-auto">
                <h1 className="text-center text-2xl font-bold font-mono"> Add Product </h1>
                <form className="flex max-w-md flex-col gap-4" onSubmit={HandleAddProduct}>
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

                    <input
                        type="file"
                        name="file"
                        onChange={uploadPicture}
                        accept=".png, .jpg, .jpeg"
                        className="inputBox"
                    />
                    {error && picture.pictureAsFile == undefined && <div className="invalid-input"> please, upload image </div>}
                    <Button type="submit">
                        Add Product
                    </Button>
                </form>
            </Card>
        </>
    );
}

export default AddProduct;