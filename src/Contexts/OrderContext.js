import {
  createContext,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";
import db from "../firebaseinit";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth } from "../firebaseinit";

const orderContext = createContext();

//Reducer function for Cart State, it performs two actions . Either add one item to cart or update cart with new array.
function cartReducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, payload];
    case "UPDATE_ALL":
      return payload.arr;
    default:
      return [];
  }
}

//Reducer function for Order State, it performs two actions . Either add new order or update Order state with new array.
function orderReducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, payload.order];
    case "UPDATE_ALL":
      return payload.arr;
    default:
      return [];
  }
}

function OrderContext({ children }) {
  const [orders, setOrders] = useReducer(orderReducer, []);
  const [cart, setCart] = useReducer(cartReducer, []);
  const [Products, setProducts] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = auth.currentUser; //current Signed In user, if no one then it will be Null

  // function to update orders in database as new order is added
  const addOrderToDatabase = async (newOrder) => {
    await updateDoc(doc(db, currentUser.uid, "Orders"), {
      myorders: arrayUnion(newOrder),
    });
  };

  //maintaining current user's cart in database
  const updateDatabaseCart = async (arr) => {
    await updateDoc(doc(db, currentUser.uid, "Cart"), {
      mycart: arr,
    });
  };

  // function to add new order
  const addOrder = () => {
    const date = String(new Date()).substring(0, 15);
    const newOrder = {
      date: `${date.slice(3)}, ${date.substring(0, 3)}`,
      cartItems: cart,
      totalPrice: TotalPrice,
    };

    addOrderToDatabase(newOrder);
    updateDatabaseCart([]);
    setOrders({ type: "ADD_ORDER", payload: { order: newOrder } });
    setCart({ type: "EMPTY", payload: {} });
    console.log(orders);
  };

  //If item is not present in cart -> Add it to cart, else increase its quantity (qty)
  const addToCart = (id) => {
    const item = Products.find((item) => item.id === id);
    if (cart.find((p) => p.id === id)) {
      incQty(id);
      return "updated";
    } else {
      setCart({ type: "ADD_ITEM", payload: { ...item, qty: 1 } });
      updateDatabaseCart([...cart, { ...item, qty: 1 }]);
      return "added";
    }
  };

  //remove item from cart
  const removeFromCart = (id) => {
    const arr = cart.filter((p) => {
      if (p.id === id) {
        return false;
      }
      return true;
    });
    setCart({ type: "UPDATE_ALL", payload: { arr: arr } });
    updateDatabaseCart(arr);
  };

  //increase product qty in cart
  const incQty = (id) => {
    const arr = cart.map((p) => {
      if (p.id === id) {
        p.qty += 1;
      }
      return p;
    });

    setCart({ type: "UPDATE_ALL", payload: { arr: arr } });
    updateDatabaseCart(arr);
  };

  //decrease product qty in cart
  const decQty = (id) => {
    const arr = cart.filter((p) => {
      if (p.id === id) {
        p.qty -= 1;
        if (p.qty <= 0) return false;
      }
      return true;
    });

    setCart({ type: "UPDATE_ALL", payload: { arr: arr } });
    updateDatabaseCart(arr);
  };

  //Maintaining total product based on cart
  useEffect(() => {
    let tot = 0;
    for (let p of cart) {
      tot += p.Price * p.qty;
    }
    setTotalPrice(tot);
  }, [cart]);

  //Fetching products from database
  useEffect(() => {
    async function fetchProducts() {
      const data = await getDocs(collection(db, "Products"));
      const arr = data.docs.map((item) => {
        const product = item.data();
        return { ...product };
      });
      setProducts(arr);
    }
    fetchProducts();
    setIsLoading(false);
  }, []);

  // fetching users data as user signed In
  useEffect(() => {
    async function fetchMyData() {
      const orderData = await getDoc(doc(db, currentUser.uid, "Orders"));
      if (orderData && orderData.data()) {
        setOrders({
          type: "UPDATE_ALL",
          payload: { arr: orderData.data().myorders },
        });
      }
      const cartData = await getDoc(doc(db, currentUser.uid, "Cart"));
      if (cartData && cartData.data()) {
        setCart({
          type: "UPDATE_ALL",
          payload: { arr: cartData.data().mycart },
        });
      }
      setIsLoading(false);
    }

    if (currentUser) {
      setIsLoading(true);
      fetchMyData();
    }
  }, [currentUser]);

  return (
    <orderContext.Provider
      value={{
        Products,
        setProducts,
        cart,
        setCart,
        setOrders,
        addToCart,
        incQty,
        decQty,
        TotalPrice,
        removeFromCart,
        addOrder,
        orders,
        isLoading,
      }}
    >
      {children}
    </orderContext.Provider>
  );
}

//custom hook
function useOrderValue() {
  const data = useContext(orderContext);
  return data;
}

export { useOrderValue };
export default OrderContext;
