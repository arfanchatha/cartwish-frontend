import "./Navbar.css";
import LinkWithIcon from "./LinkWithIcon";

import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { getSuggestionsAPI } from "../../services/productServices";

function Navbar({ cartCount }) {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };

  const handleKyeDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedItem((current) =>
        current === suggestions.length - 1 ? 0 : current + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedItem((current) =>
        current === 0 ? suggestions.length - 1 : current - 1
      );
    } else if (e.key === "Enter" && selectedItem > -1) {
      const suggestion = suggestions[selectedItem];
      navigate(`/products?search=${suggestion.title}`);
      setSearch("");
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search).then((res) => setSuggestions(res.data));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestions);
  }, [search]);

  return (
    <nav className="navbar">
      <div className="nav_main">
        <h1 className="nav_logo">CartWish</h1>
        <form className="nav_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="nav_search"
            placeholder="Search item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKyeDown}
          />
          <button className="search_button">Search</button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((item, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={item._id}
                >
                  <Link
                    to={`/products?search=${item.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center nav_links">
        <LinkWithIcon emoji={rocket} title="Home" link="/" />
        <LinkWithIcon emoji={star} title="Products" link="/products" />
        {!user && (
          <>
            <LinkWithIcon emoji={idButton} title="Login" link="/login" />
            <LinkWithIcon emoji={memo} title="SignUp" link="/signup" />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon emoji={order} title="My Orders" link="/myorders" />
            <LinkWithIcon emoji={lock} title="Logout" link="/logout" />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cartCount}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
