import { useRef } from "react";
import style from "../Styles/RegisterUser.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useValue } from "../Contexts/AuthContext";

function RegisterUser() {
  const { signUp } = useValue();
  const nameref = useRef(); //reference for name input
  const emailRef = useRef(); //reference for email input
  const passwordRef = useRef(); //reference for password input
  const navigate = useNavigate();

  //this function invokes when signup form is submitted, it uses signup function from authcontext and gives toast based on returned values
  const createUser = async (event) => {
    event.preventDefault();

    const N = nameref.current.value.trim();
    const E = emailRef.current.value.trim();
    const P = passwordRef.current.value.trim();

    const res = await signUp(N, E, P);
    if (res === "success") {
      toast.success("User Registered");
      navigate("/", { replace: true });
    } else {
      toast.warn(res);
    }

    //clearing inputs
    nameref.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form className={style.registerForm}>
      <h1>Sign Up</h1>
      <input type="Text" placeholder="Enter Name" ref={nameref} />
      <input type="Email" placeholder="Enter Email" ref={emailRef} />
      <input type="Text" placeholder="Enter Password" ref={passwordRef} />
      <button onClick={createUser}>Sign Up</button>
    </form>
  );
}

export default RegisterUser;
