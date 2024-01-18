import style from "../Styles/Error.module.css";
import { NavLink } from "react-router-dom";

//This is a simple ERROR ELEMENT, which will be rendered whenever something goes wrong in routing/routes
// It uses a navlink to navigate to homepage on pressing the button
function SomethingWentWrong() {
  return (
    <div className={style.container}>
      <img
        src="https://www.freepnglogos.com/uploads/dog-png/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png"
        alt="error-pic"
      />
      <h1>Oops... Something went wrong </h1>
      <button className={style.btn}>
        <NavLink to="/" replace={true}>
          Go to homepage
        </NavLink>
      </button>
    </div>
  );
}

export default SomethingWentWrong;
