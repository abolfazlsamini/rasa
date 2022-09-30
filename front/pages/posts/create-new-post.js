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
  const [apiParent, setApiParent] = useState("0");
  // const router = useRouter();
  // StateManage(); //this is just a useEffect to verify token
  // const isAuthenticated = useSelector(
  //   (state) => state.authReducer.isAuthenticated
  // );
  // if (typeof window !== "undefined" && !isAuthenticated)
  //   router.push("/profile/login");

  // if (!isAuthenticated) return <></>;

  function makeNewPage(pageName) {
    const res = createNewPageAPI(pageName, "text", apiParent, "69").then(
      (response) => {
        if (response.success != null && response.success != undefined) {
          const newArray = [...postData];
          if (selectedPage === "0") {
            newArray.splice(postData.length, 0, {
              id: response.success,
              pageTitle: pageName,
              parent: selectedPage,
            });
          } else {
            const parentId = newArray.findIndex(
              (child) => child.id === selectedPage
            );
            const parentNum = newArray[parentId].parent;
            if (parentNum != "0") {
              newArray.splice(parentId + 1, 0, {
                id: response.success,
                pageTitle: pageName,
                parent: parentNum,
              });
            } else {
              newArray.splice(parentId + 1, 0, {
                id: response.success,
                pageTitle: pageName,
                parent: selectedPage,
              });
            }
          }
          setPostData(newArray);
        } else {
          // TODO if it's 403 this should happen not just for anything
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
              event.preventDefault();
              setSelectedPage("0");
            }}
            className={
              "0" != selectedPage ? styles.PostTitle : styles.PostTitleIsActive
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
                  event.preventDefault();
                  setSelectedPage(pages.id);

                  if (pages.id === "0") {
                    setApiParent(pages.id);
                  } else {
                    if (pages.parent != "0") {
                      setApiParent(pages.parent);
                    } else {
                      setApiParent(pages.id);
                    }
                  }
                }}
                className={
                  pages.id != selectedPage
                    ? pages.parent === "0"
                      ? styles.Parent
                      : styles.Children
                    : pages.parent === "0"
                    ? styles.ParentIsActive
                    : styles.ChildrenIsActive
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
        <fieldset className={styles.fieldset}>
          <button
            onClick={(event) => {
              handleSubmit(event);
            }}
            className={styles.CreateNewPage}
          >
            New Page
          </button>
          <input
            className={
              textInput === ""
                ? styles.pageTitleInputFieldEmpty
                : styles.pageTitleInputField
            }
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
