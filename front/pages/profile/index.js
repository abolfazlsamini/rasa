import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../actions/auth";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  if (typeof window !== "undefined" && !isAuthenticated)
    router.push("/profile/login");

  if (isAuthenticated) return <>Profile index</>;
  return <></>;
}

export default Profile;
