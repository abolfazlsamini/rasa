import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/ViewPost.module.css";
import { createNewPostAPI } from "../../actions/post";
import { useRouter } from "next/router";
import swal from "sweetalert";
import StateManage from "../../components/stateManage";
import { useSelector } from "react-redux";
function postTitleFunction() {
  const [postTitle, setPostTitle] = useState("");
  const router = useRouter();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (typeof window !== "undefined" && !isAuthenticated)
    router.push({
      pathname: "/profile/login",
      query: { redirect: "posts/create-new-post-name" },
    });

  if (!isAuthenticated) return <></>;

  function onChangeHandler(event) {
    event.preventDefault();
    setPostTitle(event.target.value);
  }
  function onclickHandler(event) {
    event.preventDefault();
    if (postTitle.length > 3)
      createNewPostAPI(postTitle).then((res) => {
        if (res.success && res.success != undefined) {
          const id = Object.values(res.success)[0];

          router.push({
            pathname: "/posts/create-new-post",
            query: { PostTitle: postTitle, id: id },
          });
        } else
          swal(
            "welp it didnt work!",
            "something happend while trying to make a new post, try logging in dipshit",
            "error",
            {
              buttons: {
                login: "login",
                cancel: "cancel",
              },
            }
          ).then((value) => {
            switch (value) {
              case "login":
                router.push({
                  pathname: "/profile/login",
                  query: { redirect: "posts/create-new-post-name" },
                });
                break;
            }
          });
      });
    else
      swal("TOO Short!", "post title is too shot just like your dick", "error");
  }
  return (
    <div>
      <form>
        Enter your post title:
        <input
          className={styles.pageTitleInputField}
          type="text"
          onChange={onChangeHandler}
          value={postTitle}
        />
        <button className={styles.CreateNewPage} onClick={onclickHandler}>
          create
        </button>
      </form>
    </div>
  );
}
export default postTitleFunction;
