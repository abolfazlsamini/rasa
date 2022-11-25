import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../actions/auth";
import styles from "../../styles/profile.module.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Image from "next/image";
import editImage from ".././../public/edit.png";
import { CallGetUserPosts } from "../../actions/post";
import Link from "next/link";

function Profile() {
  const [data, setData] = useState([1, 2, 3]);
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
    if (isAuthenticated)
      CallGetUserPosts().then((data) => {
        if (data.success) setData(Object.values(data)[0]);
      });
  }, []);
  if (!isAuthenticated) return <></>;
  return (
    <div className={styles.CreatePost}>
      {data?.map((posts) => {
        return posts.pages != null ? (
          <ul className={styles.PostList}>
            <Link href={`/posts/show/${posts.id}/${posts.pages}`}>
              <a>
                <li id={posts.id} href="/" key={posts.id}>
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
              </a>
            </Link>
          </ul>
        ) : (
          <></>
        );
      })}
    </div>
  );
}

export default Profile;
