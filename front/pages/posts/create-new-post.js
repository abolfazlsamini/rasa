import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ViewPost.module.css";
import {
  createNewPageAPI,
  deletePageAPI,
  updatePageAPI,
} from "../../actions/post";

import { logout } from "../../actions/auth";
import swal from "sweetalert";
import { LOGIN_FAIL } from "../../actions/types";
import editPost from "./edit-post";
function postFunction() {
  const router = useRouter();
  const postId = router.query.id;
  const postTitle = router.query.PostTitle;
  const isNew = router.query.isNew;

  const dispatch = useDispatch();

  const [postData, setPostData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [pageTitleInput, setPageTitleInput] = useState("");
  const [bigTextInput, setBigTextInput] = useState("");
  const [selectedPage, setSelectedPage] = useState("0");
  const [apiParent, setApiParent] = useState("0");

  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (typeof window !== "undefined" && !isAuthenticated)
    router.push("/profile/login");

  if (!isAuthenticated) return <></>;
  if (postTitle !== "undefined" && !postTitle) return <></>;

  useEffect(() => {
    if (router.isReady) {
      const res = editPost(postId);
      console.log({ id: postId, isNew: isNew });
      setPostData(res);
      console.table(res);
    }
  }, [router.isReady]);

  function makeNewPage(pageName) {
    const res = createNewPageAPI(pageName, "", apiParent, postId).then(
      (response) => {
        if (
          response.success &&
          response.success != null &&
          response.success != undefined
        ) {
          const newArray = [...postData];
          if (selectedPage === "0") {
            newArray.splice(postData.length, 0, {
              id: response.success,
              pageTitle: pageName,
              parent: selectedPage,
              text: "",
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
                text: "",
              });
            } else {
              newArray.splice(parentId + 1, 0, {
                id: response.success,
                pageTitle: pageName,
                parent: selectedPage,
                text: "",
              });
            }
          }
          setPostData(newArray);
        } else {
          // TODO if it's 403 this should happen not just for anything
          // if (dispatch && dispatch !== null && dispatch !== undefined)
          //   dispatch(logout());
          swal(
            "couldn't create a page",
            "something went wrong creating the page try logging in again see if that'll help",
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
        }
      }
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (textInput && textInput != null && textInput != undefined) {
      makeNewPage(textInput);
      setTextInput(""); // clears text input field after submitting
    } else swal("page title can't be empty");
  }
  function handleSave(event) {
    event.preventDefault();
    if (selectedPage != "0") {
      if (!pageTitleInput || pageTitleInput === "")
        swal("Couldn't Update page", "page title ccan't be empty", "error");
      else
        updatePageAPI(selectedPage, pageTitleInput, bigTextInput, postId).then(
          (res) => {
            if (res.success) {
              const newArray = [...postData];
              const selectedPageIndex = newArray.findIndex(
                (child) => child.id === selectedPage
              );
              newArray.splice(selectedPageIndex, 1, {
                id: newArray[selectedPageIndex].id,
                pageTitle: pageTitleInput,
                parent: newArray[selectedPageIndex].parent,
                text: bigTextInput,
              });
              setPostData(newArray);
            } else {
              swal(
                "Couldn't Update page",
                "something went wrong went updating the page, if this keeps happening try logging in again",
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
            }
          }
        );
    } else swal("No page was selected");
  }
  function handleDelete(event) {
    event.preventDefault();
    // deletePageAPI("69", "540").then((res) => {
    //   console.log(res);
    //   if (res.success && res.success != null && res.success != undefined) {
    //     const newArray = [...postData];
    //     const selectedPageIndex = newArray.findIndex(
    //       (child) => child.id === selectedPage
    //     );
    //     newArray.splice(selectedPageIndex, 1);
    //     setPostData(newArray);
    //     setSelectedPage("0");
    //   } else console.error("error", res);
    // });

    swal("yeah... this button dosn't work yet");
  }

  const ThePages = () => {
    return (
      <ul className={styles.pageList}>
        <li key={"0"}>
          <a
            href=""
            onClick={(event) => {
              event.preventDefault();
              setSelectedPage("0");
              setPageTitleInput("");
              setBigTextInput("");
            }}
            className={
              "0" != selectedPage ? styles.PostTitle : styles.PostTitleIsActive
            }
          >
            {postTitle}
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
                  setPageTitleInput(pages.pageTitle);
                  setBigTextInput(pages.text);
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
  const Textarea = () => {
    return (
      <div className={styles.Textarea}>
        <form>
          <fieldset>
            <input
              value={pageTitleInput}
              onChange={(e) => {
                setPageTitleInput(e.target.value);
              }}
              placeholder="Page Title"
            />

            <br />
            <textarea
              value={bigTextInput}
              placeholder="Text"
              onChange={(e) => {
                setBigTextInput(e.target.value);
              }}
            />
            <br />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
          </fieldset>
        </form>
      </div>
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
            placeholder={"Page Title"}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          />
          <br />
          <ThePages />
        </fieldset>
      </form>
      {Textarea()}
    </div>
  );
}
export default postFunction;
