import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
    router.push("/");
  };
  if (!isAuthenticated) {
    return (
      <div className={styles.navbar}>
        <ul>
          <li>
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={"/profile/login"}>
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href={"/profile/register"}>
              <a>Signup</a>
            </Link>
          </li>
          <li>
            <Link href={"/posts/create-new-post-name"}>
              <a>create new post</a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={"/profile"}>
            <a>Profile</a>
          </Link>
        </li>
        <li>
          <Link href={"/posts/create-new-post-name"}>
            <a>create new post</a>
          </Link>
          <Link href={"#"}>
            <a onClick={logoutHandler}>Logout</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
