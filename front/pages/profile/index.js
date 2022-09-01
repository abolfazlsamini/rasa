import StateManage from "../../components/stateManage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../../actions/auth";
function Profile({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (!isAuthenticated) dispatch(verify());
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/profile/login");
  }
  // useEffect(() => {
  //   if (dispatch && dispatch !== null && dispatch !== undefined)
  //     dispatch(verify());
  // }, [dispatch]);
  return (
    <>
      <StateManage />
      Profile index
      {console.log(data)}
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/api/get-posts/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Profile;
