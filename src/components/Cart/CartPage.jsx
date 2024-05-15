import "./CartPage.css";

import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { checkOutAPI } from "../../services/OrderServices";
import { toast } from "react-toastify";

function CartPage() {
  const [subTotal, setSubTotal] = useState(0);

  const { user, cart, removeCart, updateCart, setCart } =
    useContext(UserContext);

  useEffect(() => {
    let total = 0;

    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);

  const checkOut = () => {
    setCart([]);
    checkOutAPI().then((res) => {
      toast.success("Order placed");
    });
  };
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  qunatity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${product.price * quantity}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkOut}>
        Check Out
      </button>
    </section>
  );
}

export default CartPage;
