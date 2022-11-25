import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { register } from "../../actions/auth";
import styles from "../../styles/login.module.css";
import StateManage from "../../components/stateManage";

function Register() {
  StateManage(); //this is just a useEffect to verify token in each dispatch
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  // is there a better way to do this?
  const redirect = router.query.redirect;
  if (redirect && redirect != undefined) {
    if (typeof window !== "undefined" && isAuthenticated)
      router.push("/" + redirect);
  } else {
    if (typeof window !== "undefined" && isAuthenticated)
      router.push("/profile");
  }

  const username = useRef();
  const password = useRef();
  const passwordConformation = useRef();

  const formHandler = useCallback(
    () => (event) => {
      event.preventDefault();
      const usernameref = username.current?.value;
      const passwordref = password.current?.value;
      const passwordConformationref = passwordConformation.current?.value;
      if (passwordref != passwordConformationref) {
        swal(
          "The password is not correct",
          "The password dose not match the comfirmation password",
          "error"
        );
        return;
      }
      console.log(usernameref, passwordref);
      dispatch(register(usernameref, passwordref));
    },
    []
  );
  if (isAuthenticated) return <></>;
  return (
    <div>
      <form className={styles.form} onSubmit={formHandler()}>
        <label htmlFor="username" name="username">
          Username:
        </label>
        <input type="text" placeholder="UserName" ref={username} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="PassWord"
          name="password"
          ref={password}
        />

        <label htmlFor="passwordConfirm">Password Confirmation:</label>
        <input
          type="Password"
          placeholder="Password Confirmation"
          name="passwordConfirm"
          ref={passwordConformation}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
