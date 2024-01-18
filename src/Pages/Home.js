import { useState } from "react";
import style from "../Styles/Home.module.css";
import FilterComp from "../Components/Filter";
import Card from "../Components/Card";
import { useOrderValue } from "../Contexts/OrderContext";
import { Circles } from "react-loader-spinner";

function Home() {
  const { Products, isLoading } = useOrderValue(); // states from orderContext
  const [FilterCategory, setFilterCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(75000); // filter price, initially set to 75000rs

  // this function is to set 'price' state based on input from filter price range
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  //loader , to invoke before data loads
  if (isLoading) {
    return (
      <div className={style.spinnerDiv}>
        <Circles color="#6e62e1" />
      </div>
    );
  }

  //First filter component is added which contains all filters , price range & product categories.
  // then next we have main homepage content, input for searching products + Products
  // While mapping products, I first applied price filter , then category filter if any.
  // If product_price > filter price, it won't be mapped, else if product_price is in filter price range than I am checking if any filterCategory
  // is selected or not using "FilterCategory.length?", if yes than i am checking if the product category is present in FilterCategory & mapping accordingly.
  return (
    <>
      <FilterComp
        price={price}
        handlePrice={handlePrice}
        Filter={FilterCategory}
        setFilter={setFilterCategory}
      />
      <div className={style.homePage}>
        <input
          placeholder="Search By Name"
          className={style.input}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={style.cardsContainer}>
          {Products.map((item, index) => {
            if (item.Price <= price) {
              if (FilterCategory.length) {
                if (FilterCategory.find((cat) => cat === item.Category)) {
                  return <Card product={item} key={index} search={search} />;
                } else return null;
              }
              return <Card product={item} key={index} search={search} />;
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
