import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseCartAPI,
  getCartAPI,
  increaseCartAPI,
  removCartAPI,
} from "./services/CartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./Contexts/UserContext";

setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);
  const addToCart = (product, quantity = 1) => {
    const updatedCard = [...cart];
    const productIndex = updatedCard.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCard.push({ product, quantity });
    } else {
      updatedCard[productIndex].quantity += quantity;
    }
    setCart(updatedCard);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Item added to cart");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setCart(cart);
      });
  };
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    if (user) getCart();
  }, [user]);

  const removeCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);
    removCartAPI(id)
      .then((res) => {
        toast.success("Removed");
      })
      .catch((err) => {
        toast.error(err.message);
        setCart(oldCart);
      });
  };

  function updateCart(type, id) {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.product._id === id);
    if (type === "increase") {
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      increaseCartAPI(id).catch((err) => {
        setCart(oldCart);
      });
    } else if (type === "decrease") {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      decreaseCartAPI(id).catch((err) => {
        setCart(oldCart);
      });
    }
  }

  return (
    <UserContext.Provider
      value={{ user, addToCart, removeCart, cart, updateCart, setCart }}
    >
      <div className="app">
        <Navbar cartCount={cart.length} />
        <main>
          <ToastContainer position="bottom-right" />
          <Routing />
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
