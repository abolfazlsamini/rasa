import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ViewPost.module.css";
import { createNewPageAPI } from "../../actions/post";

function postFunction() {
  const [postData, setPostData] = useState([]);
  const [textInput, setTextInput] = useState("");

  // const router = useRouter();
  // StateManage(); //this is just a useEffect to verify token
  // const isAuthenticated = useSelector(
  //   (state) => state.authReducer.isAuthenticated
  // );
  // if (typeof window !== "undefined" && !isAuthenticated)
  //   router.push("/profile/login");

  // if (!isAuthenticated) return <></>;
  function makeNewPage(pageName) {
    const res = createNewPageAPI(pageName, "text", "0", "69").then(
      (response) => console.log(response.data) //TODO this should be the id of the new page
    );
    //TODO if 200 then:
    setPostData((oldArray) => [...oldArray, pageName]);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (textInput && textInput != null && textInput != undefined)
      makeNewPage(textInput);
    setTextInput(""); // clear text input field after submitting
  }
  const ThePages = (prop) => {
    return (
      <a
        href=""
        onClick={(event) => event.preventDefault()}
        className={styles.PageTitle}
      >
        {postData.map((pages) => (
          <div>
            <a
              href=""
              onClick={(event) => event.preventDefault()}
              className={styles.PageTitle}
            >
              {pages}
            </a>
          </div>
        ))}
      </a>
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
          <ThePages />
        </fieldset>
      </form>
    </div>
  );
}
export default postFunction;
