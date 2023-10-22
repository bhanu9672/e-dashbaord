import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log( picture.pictureAsFile )
        if (!name || !price || !category || !company || !picture ) {
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
            console.log( response )
            console.log("Successfully uploaded image");
            navigate( "/" );
        } else {
            console.log("Error Found");
        }
    };

    return (
        <div className="product">
            <h1> Add Product </h1>
            <form onSubmit={HandleAddProduct}>
                <input type="text" placeholder="Enter Product Name" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} />
                {error && !name && <span className="invalid-input"> Enter Valid Name </span>}
                <input type="text" placeholder="Enter Product Price" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                {error && !price && <span className="invalid-input"> Enter Valid Price </span>}
                <input type="text" placeholder="Enter Product Category" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                {error && !category && <span className="invalid-input"> Enter Valid Category </span>}
                <input type="text" placeholder="Enter Product Company" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                {error && !company && <span className="invalid-input"> Enter Valid Company Name </span>}
                <input
                    type="file"
                    name="file"
                    onChange={uploadPicture}
                    accept=".png, .jpg, .jpeg"
                    className="inputBox"
                />
                {error && picture && <div className="invalid-input"> please, upload image </div>}
                <button type="submit" name="upload" className="appButton">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;