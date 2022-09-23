import StateManage from "../../components/stateManage";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Signup() {
  const router = useRouter();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/profile");
    //TODO dispatch(logout()); // this deletes the wrong access token to prevent unnecessary requests to backend
  }

  if (isAuthenticated) return <></>;
  return <h2>naw i'm too lazy go do it with postman or somthn</h2>;
}

export default Signup;
