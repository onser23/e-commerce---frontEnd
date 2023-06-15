import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))} `,
        },
      }
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${params.id}`,
      {
        method: "put",
        body: JSON.stringify({
          name,
          price,
          category,
          company,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))} `,
        },
      }
    );
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Mehsul"
      />
      {error && !name && (
        <span className="invalid-input">Mehsulun adi bosdur!</span>
      )}
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Qiymet"
      />
      {error && !price && (
        <span className="invalid-input">Mehsulun qiymeti bosdur!</span>
      )}
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Kategoriya"
      />
      {error && !category && (
        <span className="invalid-input">Mehsulun kateqoriyasi bosdur!</span>
      )}
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Sirket"
      />
      {error && !company && (
        <span className="invalid-input">Mehsulun brendi bosdur!</span>
      )}
      <button onClick={updateProduct} className="appButton">
        Redakte Et
      </button>
    </div>
  );
};

export default UpdateProduct;
