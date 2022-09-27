import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ViewPost.module.css";
import { createNewPageAPI } from "../../actions/post";
import { logout } from "../../actions/auth";

function postFunction() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPage, setSelectedPage] = useState("0");
  // const router = useRouter();
  // StateManage(); //this is just a useEffect to verify token
  // const isAuthenticated = useSelector(
  //   (state) => state.authReducer.isAuthenticated
  // );
  // if (typeof window !== "undefined" && !isAuthenticated)
  //   router.push("/profile/login");

  // if (!isAuthenticated) return <></>;
  function makeNewPage(pageName) {
    const res = createNewPageAPI(pageName, "text", selectedPage, "69").then(
      (response) => {
        if (response.success != null && response.success != undefined) {
          setPostData((oldArray) => [
            ...oldArray,
            { pageTitle: pageName, id: response.success },
          ]);
        } else {
          // if it's 403 this should happen not just for anything
          // if (dispatch && dispatch !== null && dispatch !== undefined)
          //   dispatch(logout());
          console.error("error", response);
        }
      }
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (textInput && textInput != null && textInput != undefined)
      makeNewPage(textInput);
    setTextInput(""); // clears text input field after submitting
  }
  const ThePages = (prop) => {
    return (
      <ul className={styles.pageList}>
        <li key={"0"}>
          <a
            href=""
            onClick={(event) => {
              setSelectedPage("0");
              event.preventDefault();
            }}
            className={
              "0" != selectedPage ? styles.PageTitle : styles.PageTitleIsActive
            }
          >
            Post Title
          </a>
        </li>
        {postData.map((pages) => {
          return (
            <li key={pages.id}>
              <a
                href=""
                onClick={(event) => {
                  setSelectedPage(pages.id);
                  event.preventDefault();
                }}
                className={
                  pages.id != selectedPage
                    ? styles.PageTitle
                    : styles.PageTitleIsActive
                }
              >
                {pages.pageTitle}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.CreatePost}>
      <form>
        <fieldset>
          <button
            onClick={(event) => {
              handleSubmit(event);
            }}
            className={styles.CreateNewPage}
          >
            New Page
          </button>
          <input
            value={textInput}
            placeholder={"page name"}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          />
          <br />
          <ThePages></ThePages>
        </fieldset>
      </form>
    </div>
  );
}
export default postFunction;
