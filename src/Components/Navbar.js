import { Outlet, Link } from "react-router-dom";
import style from "../Styles/Navbar.module.css";
import { toast } from "react-toastify";
import { useValue } from "../Contexts/AuthContext";

//Navbar Component
function Navbar() {
  const { SignedIn, setSignedIn, signOut } = useValue();

  //function to handle when signout is clicked
  const handleSignOut = () => {
    setSignedIn(false);
    toast.success("User SIgned Out");
    signOut(); //this function is taken from authContext using custom hook useValue();
  };

  //Images and Links are set based on 'SignedIn' state
  //At last outlet is defined for all its child components/pages
  return (
    <>
      <div className={style.Navbar}>
        <Link to="/">Buy Busy</Link>
        <div className={style.RightContainer}>
          <div
            className={style.NavIcon}
            onClick={() => {
              if (SignedIn) {
                handleSignOut();
              }
            }}
          >
            <img
              src={
                SignedIn
                  ? "https://cdn-icons-png.flaticon.com/128/1828/1828490.png"
                  : "https://cdn-icons-png.flaticon.com/128/3596/3596089.png"
              }
              alt="Home"
            />
            <Link to={!SignedIn ? "Signin" : "/"}>
              {SignedIn ? " Sign Out" : "Sign In"}
            </Link>
          </div>
          {SignedIn ? (
            <>
              <div className={style.NavIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/891/891462.png"
                  alt="Home"
                />
                <Link to={"Cart"}>Cart</Link>
              </div>
              <div className={style.NavIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9561/9561688.png"
                  alt="Home"
                />
                <Link to={"Orders"}>My Orders</Link>
              </div>
            </>
          ) : null}
          <div className={style.NavIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2550/2550430.png"
              alt="Home"
            />
            <Link>Home</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Navbar;
