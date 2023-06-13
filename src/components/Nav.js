import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img
        className="logo"
        alt="logo"
        src="https://webaku.az/wp-content/uploads/2023/04/1664229508156.jpeg"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/update">Update Products</Link>
          </li>
          <li>
            <Link to="/profile">Profilim</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Çıxış ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/login">Daxil ol</Link>
          </li>
          <li>
            <Link to="/signup">Qeydiyyat</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
