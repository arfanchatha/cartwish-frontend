import { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import Table from "../Common/Table";
import "./MyOrderPage.css";

function MyOrderPage() {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    apiClient.get("/order").then((res) => setMyOrders(res.data));
  }, []);
  const productsString = (order) => {
    const string = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return string.join(", ");
  };

  return (
    <section className="align_center myorder_page">
      {myOrders.length ? (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {myOrders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{productsString(item)}</td>
                <td>${item.total}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1 className="cart_p">
          Please add the item to cart and then proceed the order
        </h1>
      )}
    </section>
  );
}

export default MyOrderPage;
