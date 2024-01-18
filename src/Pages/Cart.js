import style from "../Styles/Home.module.css";
import { CartCard } from "../Components/Card";
import TotalPrice from "../Components/TotalPrice";
import { useOrderValue } from "../Contexts/OrderContext";
import { NavLink } from "react-router-dom";

function Cart() {
  // cart contains all cartitems with their quantity, description, price...
  const { cart } = useOrderValue();

  // if cart is empty this will be returned
  if (cart.length === 0) {
    return (
      <div className={style.emptyCart}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/13637/13637462.png"
          alt="cart"
        />
        <h1>Cart is empty</h1>
        <button className={style.button}>
          {" "}
          <NavLink to="/">Return To Shop</NavLink>
        </button>
      </div>
    );
  }
  // based on cart , cartcards are mapped
  return (
    <>
      <div className={style.homePage}>
        <TotalPrice />
        <div className={style.cardsContainer}>
          {cart.map((product, index) => (
            <CartCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
