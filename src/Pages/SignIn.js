import style from "../Styles/RegisterUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useValue } from "../Contexts/AuthContext";

function SignIn() {
  const { signIn } = useValue();
  const emailRef = useRef(""); // reference for email Input
  const passwordRef = useRef(""); // reference for password Input
  const navigate = useNavigate();

  //this function invokes when form is submitted, it uses signIn function from authContext and give toasts based on return value of SignIn func.
  const handleClick = async (event) => {
    event.preventDefault();
    const e = emailRef.current.value.trim();
    const p = passwordRef.current.value.trim();

    const res = await signIn(e, p);
    console.log(res);
    if (res === "success") {
      toast.success("User Signed In");
      navigate("/", { replace: true });
    } else {
      toast.warn(res);
    }

    //clear inputs
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form className={`${style.registerForm} ${style.login}`}>
      <h1>Sign In</h1>
      <input type="Email" placeholder="Enter Email" ref={emailRef} />
      <input type="Password" placeholder="Enter Password" ref={passwordRef} />
      <button onClick={handleClick}>Sign In</button>
      <p className={style.p}>
        <Link to={"/Signup"}>Or SignUp instead</Link>
      </p>
    </form>
  );
}

export default SignIn;
