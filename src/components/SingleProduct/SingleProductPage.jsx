import { useParams } from "react-router-dom";
import QuantityInput from "./QuantityInput";
import "./SingleProductPage.css";
import { useContext, useState } from "react";
import useData from "../../Hooks/useData";
import UserContext from "../../Contexts/UserContext";

function SingleProductPage() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  const { addToCart, user } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="align_center single_product">
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_img" : ""}
                  onClick={() => setSelectedImage(index)}
                  key={index}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className=" single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            <h2 className="quantity_title"></h2>
            {user && (
              <>
                <div className="align_center quantity_input">
                  <QuantityInput
                    qunatity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default SingleProductPage;
