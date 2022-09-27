import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ViewPost.module.css";
import { createNewPageAPI } from "../../actions/post";

function postFunction() {
  const [postData, setPostData] = useState([]);
  const [textInput, setTextInput] = useState("");

  const router = useRouter();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (typeof window !== "undefined" && !isAuthenticated)
    router.push("/profile/login");

  if (!isAuthenticated) return <></>;
  function makeNewPage(pageName) {
    const res = createNewPageAPI(pageName, "text", "0", "69").then(
      (response) => {
        if (response.success != null && response.success != undefined) {
          setPostData((oldArray) => [
            ...oldArray,
            { pageTitle: pageName, id: response.success },
          ]);
        } else console.error("error", response);
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
        {postData.map((pages) => {
          return (
            <li key={pages.id}>
              <a
                href=""
                onClick={(event) => event.preventDefault()}
                className={styles.PageTitle}
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
