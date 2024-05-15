import { Routes, Route } from "react-router-dom";

import LoginForm from "../Authentication/LoginForm";

import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";

import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import SignupPage from "../Authentication/SignupPage";
import Logout from "../Authentication/Logout";
import Protected from "./Protected";

function Routing({ addToCart, cart, removeCart }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/products/:id"
        element={<SingleProductPage addToCart={addToCart} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginForm />} />

      <Route element={<Protected />}>
        <Route
          path="/cart"
          element={<CartPage cart={cart} removeCart={removeCart} />}
        />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

export default Routing;
