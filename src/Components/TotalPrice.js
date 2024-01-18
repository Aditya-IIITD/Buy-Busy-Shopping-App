import { useNavigate } from "react-router-dom";
import { useOrderValue } from "../Contexts/OrderContext";
import style from "../Styles/cart.module.css";

// This component if part of "Cart" page, it contains the information about totalPrice of cart items and the button to purchase cartItems
function TotalPrice() {
  const { TotalPrice, addOrder } = useOrderValue();
  const navigate = useNavigate();
  //this funciton invokes when Purchase button is pressed, it places a new order
  const handleOrder = () => {
    navigate("/Orders");
    addOrder();
  };
  return (
    <div className={style.priceContainer}>
      <h3>Total Price:- ₹{TotalPrice}/-</h3>
      <button className={style.btn} onClick={handleOrder}>
        Purchase
      </button>
    </div>
  );
}

export default TotalPrice;
