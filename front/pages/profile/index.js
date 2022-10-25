import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../actions/auth";
import styles from "../../styles/profile.module.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";
function Profile() {
  const [data, setData] = useState([]);
  const router = useRouter();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (typeof window !== "undefined" && !isAuthenticated)
    router.push({
      pathname: "/profile/login",
      query: { redirect: "profile" },
    });

  useEffect(() => {
    getData().then((data) => {
      if (isAuthenticated) setData(Object.values(data)[0]);
    });
  }, []);
  if (!isAuthenticated) return <></>;
  try {
    return (
      <div className={styles.CreatePost}>
        <form>
          {data?.map((posts) => {
            return (
              <ul className={styles.PostList}>
                <li
                  id={posts.id}
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    swal(
                      "it doesn't work for now this is the post id: " + posts.id
                    );
                  }}
                  title="Edit This Post"
                >
                  <div className={styles.PostTitle}>{posts.post_title}</div>
                  <br />
                  <div className={styles.Date}>
                    Created In: {posts.created_date.slice(0, 4)}/
                    {posts.created_date.slice(5, 7)}/
                    {posts.created_date.slice(8, 10)} At:{" "}
                    {posts.created_date.slice(14, 16)}:
                    {posts.created_date.slice(17, 19)}
                  </div>
                </li>
              </ul>
            );
          })}
        </form>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}
async function getData() {
  try {
    const res = await fetch("/api/posts/get_posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res.json();
    } else {
      return "failed to get posts";
    }
  } catch (err) {
    console.log(err);
    return "something went wrong trying to get posts";
  }
}
export default Profile;
