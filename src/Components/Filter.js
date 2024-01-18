import style from "../Styles/Filter.module.css";

// This is the filter component for homepage
function FilterComp({ price, handlePrice, Filter, setFilter }) {
  // this function handles the item categories defined in filter, if any category is selected it will be added filter state which will make
  // the component re-render the filtered items
  const handleClick = (cat) => {
    if (Filter.indexOf(cat) >= 0) {
      const arr = Filter.filter((item) => item !== cat);
      setFilter(arr);
    } else {
      const arr = [...Filter, cat];
      setFilter(arr);
    }
  };

  //input range is given from 1 t0 80000 whose intial value is set to 75000 in state price, it value depends on state "price" as the input
  // is dragged the state value changes accordingly and the items are filtered. "HandlePrice" function is taken as prop from parent element.
  //Then there are 4 categories which are attached with click event, on click it triggers handleClick and updates filter state.
  return (
    <div className={style.FilterContainer}>
      <div className={style.Filter}>
        <h3>Filter</h3>
        <p>Price: {price}</p>
        <input
          type="range"
          min="1"
          max="80000"
          value={price}
          onChange={(e) => handlePrice(e)}
        />
      </div>
      <div>
        <h3>Category</h3>
        <ul type="none">
          <li>
            <input
              type="Checkbox"
              id="Men"
              onClick={() => handleClick("men_cloth")}
            />
            <label htmlFor="Men">Men's Clothing</label>
          </li>
          <li>
            <input
              type="Checkbox"
              id="women"
              onClick={() => handleClick("women_cloth")}
            />
            <label htmlFor="women">Women's Clothing</label>
          </li>
          <li>
            <input
              type="Checkbox"
              id="Jewelery"
              onClick={() => handleClick("Jewelery")}
            />
            <label htmlFor="Jewelery">Jewelery</label>
          </li>
          <li>
            <input
              type="Checkbox"
              id="Electronics"
              onClick={() => handleClick("Electronics")}
            />
            <label htmlFor="Electronics">Electronics</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FilterComp;
