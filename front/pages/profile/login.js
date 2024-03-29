import router from "next/router";
import StateManage from "../../components/stateManage";
import { login } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/login.module.css";
import swal from "sweetalert";
import { useRouter } from "next/router";

function Login() {
  StateManage(); //this is just a useEffect to verify token
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
  if (isAuthenticated) return <></>;
  //TODO: else dispatch(logout()); // this deletes the wrong access token to prevent unnecessary requests to backend

  const handleSubmit = async (event) => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    event.preventDefault();
    if (validateData(username, password)) {
      dispatch(login(username, password));
    }
  };
  function validateData(username, password) {
    if (!username || !password) {
      swal("Can't login", "username or password field can't be empty", "error");
      return false;
    } else return true;
  }
  return (
    <div className={styles.form}>
      {/* <StateManage /> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="username" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
