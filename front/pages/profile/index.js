import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../actions/auth";
import styles from "../../styles/ViewPost.module.css";
import { useState, useEffect } from "react";
function Profile() {
  const [data, setData] = useState([]);
  const router = useRouter();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (typeof window !== "undefined" && !isAuthenticated)
    router.push("/profile/login");

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
              <fieldset>
                <legend>
                  <a
                    className={styles.PostTitle}
                    href=""
                    onClick={(event) => event.preventDefault()}
                    title="Go to post's edit page"
                  >
                    {posts.post_title}
                  </a>
                </legend>
                {posts.pages?.map((pages) => {
                  return (
                    <>
                      <a
                        className={styles.PageTitle}
                        href=""
                        onClick={(event) => event.preventDefault()}
                        title={pages.page_title}
                      >
                        {pages.page_title}
                      </a>
                      <br />
                    </>
                  );
                })}
              </fieldset>
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
