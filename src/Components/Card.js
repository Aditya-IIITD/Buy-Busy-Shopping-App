import { useNavigate } from "react-router-dom";
import { useValue } from "../Contexts/AuthContext";
import style from "../Styles/Card.module.css";
import { useOrderValue } from "../Contexts/OrderContext";
import { toast } from "react-toastify";

//Two cards are defined here,

// A) This is the card for products on homepage
function Card({ product, search }) {
  const { SignedIn } = useValue();
  const navigate = useNavigate();
  const { addToCart } = useOrderValue();

  // this function invokes as "ADD To Cart" btn is pressed, addtion to cart is handled with the help of cartReducer in OrderContext so
  //'addToCart function is taken using useOrderValue() custom hook, addToCart returns a string -> if returned string === "success" means
  // item is added with quantity = 1 to cart, and if returned string  === "updated" that means item was present in the cart, its qty is increased by 1
  const handleAddToCart = (id) => {
    if (!SignedIn) {
      navigate("SignIn", { replace: true });
    } else {
      const res = addToCart(id);
      if (res === "updated") {
        toast.success("Increased product count");
      } else {
        toast.success("Product added to cart");
      }
    }
  };

  //search is a state defined in parent component, here it is used to filter out the searched component. If search is empty than return every component
  // Else check if the item description includes the searched text or not, if it includes the searched text return it, else return Null.
  if (search.length) {
    const str = search.trim().toLowerCase();
    if (!product.Description.toLowerCase().includes(str)) return null;
  }

  return (
    <div className={style.Card}>
      <div className={style.productDetails}>
        <div className={style.productImage}>
          <img className={style.img} alt="Product" src={product.image} />
        </div>
        <div className={style.productDescription}>{product.Description}</div>
        <h2>₹ {product.Price}</h2>
      </div>
      <button
        className={style.button}
        onClick={() => handleAddToCart(product.id)}
      >
        Add To Cart
      </button>
    </div>
  );
}

// B) This is the card for products in Cart
export function CartCard({ product }) {
  // these all are functions that handle different funciton of cartcard
  // incQty is for + icon on card it increases the quantity of item in cart
  // decQty is for - icon , it decreases the qty of item in cart
  // removeFromCart is for "Remove From Cart" btn
  const { incQty, decQty, removeFromCart } = useOrderValue();

  return (
    <div className={style.Card}>
      <div className={style.productDetails}>
        <div className={style.productImage}>
          <img className={style.img} alt="Product" src={product.image} />
        </div>
        <div className={style.productDescription}>{product.Description}</div>
        <div className={style.qtyNprice}>
          <h2>₹ {product.Price}</h2>
          <div className={style.qtyBtns}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
              alt="minus"
              onClick={() => decQty(product.id)}
            />
            <span>{product.qty}</span>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
              alt="plus"
              onClick={() => incQty(product.id)}
            />
          </div>
        </div>
      </div>
      <button
        className={`${style.button} ${style.removeBtn}`}
        onClick={() => {
          removeFromCart(product.id);
          toast.success("Product Removed Successfully");
        }}
      >
        Remove From Cart
      </button>
    </div>
  );
}

export default Card;
