import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, Label, TextInput, Card } from 'flowbite-react';

const Store = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  }

  const ProductsList = products.length > 0 && products.map(function (data) {
    if (data.img) {
      const blob = new Blob([Int8Array.from(data.img.data.data)], { type: data.img.contentType });
      var image = window.URL.createObjectURL(blob);
    }
    return (
      <>
        <div
          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          key={data._id}>
          <Link to={`/product/${data._id}`}>
            {
              data.img &&
              <img
                src={image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
            }
          </Link>
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {data.company}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              <Link to={`/product/${data._id}`}> {data.name} </Link>
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${data.price}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  $5000
                </p>
              </del>
              <div className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  })
  console.log(products)

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
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Our Feature Product</h1>
        <TextInput
          color="gray"
          className="pb-10 w-1/4 m-auto"
          placeholder="Enter Search Product"
          onChange={searchHandle}
        />
      </div>
      {/* ✅ Grid Section - Starts Here 👇 */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {
          products.length > 0 ?
            ProductsList
            : <h1 className="no-product-found">
              No Search Product Found.
            </h1>
        }
      </section>
      {/* 🛑 Grid Section - Ends Here */}
    </>
  )
}

export default Store;