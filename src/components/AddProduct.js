import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        name,
        price,
        category,
        userId,
        company,
      }),
      headers: { "Content-Type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))} `,
    
    },
    });
    result = await result.json();
    console.log(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
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
      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
