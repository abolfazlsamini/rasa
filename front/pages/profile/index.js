import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../actions/auth";
import styles from "../../styles/profile.module.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Image from "next/image";
import editImage from ".././../public/edit.png";

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
                <li id={posts.id} href="">
                  <div className={styles.PostTitle}>{posts.post_title}</div>{" "}
                  <Image
                    title="Edit This Post"
                    className={styles.image}
                    src={editImage}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                    onClick={(event) => {
                      event.preventDefault();
                      router.push({
                        pathname: "/posts/create-new-post",
                        query: {
                          PostTitle: posts.post_title,
                          id: posts.id,
                          isNew: false,
                        },
                      });
                    }}
                  />
                  <br />
                  <div className={styles.Date}>
                    Created In: {posts.created_date.slice(0, 4)}/
                    {posts.created_date.slice(5, 7)}/
                    {posts.created_date.slice(8, 10)} At:{" "}
                    {posts.created_date.slice(11, 13)}:
                    {posts.created_date.slice(14, 16)}
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
