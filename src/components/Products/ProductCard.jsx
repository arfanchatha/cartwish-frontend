import "./ProductCard.css";

import basket from "../../assets/basket.png";
import star from "../../assets/white-star.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../../Contexts/UserContext";

function ProductCard({
  image,
  price,
  rating,
  reviewCounts,
  stock,
  title,
  id,
  product,
}) {
  // const { images, price, reviews, stock, title, _id: id } = product;

  const { addToCart, user } = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/products/${id}`}>
          <img
            src={`http://localhost:5000/products/${image}`}
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="product_details">
        <h3 className="product_proce">${price}</h3>
        <p className="product_title">{title}</p>
        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_cnter product_rating">
              <img src={star} alt="star" />
              {rating}
            </p>
            <p className="product_review_count">{reviewCounts}</p>
          </div>
          {stock > 0 && user && (
            <button className="add_to_cart">
              <img
                src={basket}
                alt="basket"
                onClick={() => addToCart(product)}
              />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
}

export default ProductCard;
