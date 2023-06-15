import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))} `,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))} `,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/search/${key}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )} `,
          },
        }
      );
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type=""
        className="search-product-box"
        placeholder="Mehsul axtar"
        onChange={searchHandler}
      />
      <ul>
        <li> S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Emeliyyat</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={product._id}>
            <li> {index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>
              <button onClick={() => deleteProduct(product._id)}>Sil</button>
              <Link to={"/update/" + product._id}>Redakte</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>Netice yoxdur</h1>
      )}
    </div>
  );
};
