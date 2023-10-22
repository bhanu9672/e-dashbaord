import React, { useState } from "react";

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    //const [file, setFile] = useState('');
    const [error, setError] = useState(false);
    const [picture, setPicture] = useState({});

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

    const setImageAction = async (e) => {
        e.preventDefault();

        console.log( picture.pictureAsFile )

        if (!name || !price || !category || !company || picture.pictureAsFile === undefined ) {
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
        const uploadedImage = await data.json();
        if (uploadedImage) {
            console.log("Successfully uploaded image");
        } else {
            console.log("Error Found");
        }
    };











    const addProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !company || !picture) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company, picture);
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        console.log(userId);

        const formData = new FormData();
        formData.append("file", picture.pictureAsFile);

        console.log(picture.pictureAsFile);

        for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }

        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId, picture }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className="product">
            <h1> Add Product </h1>
            <form onSubmit={setImageAction}>
                <input type="text" placeholder="Enter Product Name" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} />
                {error && !name ? <span className="invalid-input"> Enter Valid Name </span> : ""}
                <input type="text" placeholder="Enter Product Price" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                {error && !price ? <span className="invalid-input"> Enter Valid Price </span> : ""}
                <input type="text" placeholder="Enter Product Category" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                {error && !category ? <span className="invalid-input"> Enter Valid Category </span> : ""}
                <input type="text" placeholder="Enter Product Company" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                {error && !company ? <span className="invalid-input"> Enter Valid Company Name </span> : ""}
                <input
                    type="file"
                    name="file"
                    onChange={uploadPicture}
                    accept=".png, .jpg, .jpeg"
                />
                {error && picture.pictureAsFile === undefined ? <span className="invalid-input"> please, upload image </span> : ""}
                <button type="submit" name="upload" className="appButton">
                    Add Producta
                </button>
            </form>



            {/* 
            <form method="post" encType="multipart/formdata">
                <input type="text" placeholder="Enter Product Name" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} />
                {error && !name ? <span className="invalid-input"> Enter Valid Name </span> : ""}
                <input type="text" placeholder="Enter Product Price" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                {error && !price ? <span className="invalid-input"> Enter Valid Price </span> : ""}
                <input type="text" placeholder="Enter Product Category" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                {error && !category ? <span className="invalid-input"> Enter Valid Category </span> : ""}
                <input type="text" placeholder="Enter Product Company" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                {error && !company ? <span className="invalid-input"> Enter Valid Company Name </span> : ""}
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="file"
                    onChange={uploadPicture}
                />
                {error && !picture ? <span className="invalid-input"> please, upload image </span> : ""}
                <button onClick={addProduct} className="appButton"> Add Product </button>
            </form> */}
        </div>
    );
}

export default AddProduct;