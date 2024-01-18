import style from "../Styles/Orders.module.css";

// This is the ordertable for every order the user place.
function OrderTable({ order }) {
  // this order prop comes form parent here which is... Orders page
  // every order will have its not information which will be added to table below
  const { date, cartItems, totalPrice } = order;
  return (
    <div className={style.order}>
      <h3 className={style.orderDate}>Ordered On: &nbsp; {date}</h3>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.Description}</td>
              <td>₹ {item.Price}</td>
              <td>{item.qty}</td>
              <td>₹ {item.qty * item.Price}</td>
            </tr>
          ))}
          <tr className={style.lastRow}>
            <td colSpan={4}> Total: ₹ {totalPrice}/-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
