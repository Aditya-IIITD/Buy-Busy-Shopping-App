import style from "../Styles/Orders.module.css";
import OrderTable from "../Components/OrderTable";
import { useOrderValue } from "../Contexts/OrderContext";

function Orders() {
  //these 'orders' are all orders the user have in the database and new ones will keep on adding as the user purchases new items
  const { orders } = useOrderValue();

  //this will be returned if there are no orders
  if (orders.length === 0) {
    return (
      <div className={style.emptyOrder}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1390/1390737.png"
          alt="order"
        />
        <h1>There is no order yet</h1>
        <p>
          No order found! Kindly check your 'cart page' or try to order
          something
        </p>
      </div>
    );
  }
  //ordertables are mapped based on orders
  return (
    <div className={style.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, index) => (
        <OrderTable order={order} key={index} />
      ))}
    </div>
  );
}

export default Orders;
