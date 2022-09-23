import StateManage from "../../components/stateManage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { verify } from "../../actions/auth";

function post() {
  const [data, setData] = useState([]);
  const router = useRouter();
  StateManage(); //this is just a useEffect to verify token
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (typeof window !== "undefined" && !isAuthenticated)
    router.push("/profile/login");

  // i spend a lot of time on this so much that i forgot that i don't even need this function :(
  function parser() {
    getData().then((data) => {
      console.log(
        Object.values(data)[0].map((posts) => {
          return posts.pages?.map((pages) => {
            return pages.page_title;
          });
        })
      );
    });
  }
  useEffect(() => {
    getData().then((data) => {
      setData(Object.values(data)[0]);
    });
  }, []);
  if (!isAuthenticated) return <></>;
  return (
    <>
      <form>
        {data?.map((posts) => {
          return (
            <fieldset>
              <legend>
                <a href="#" title="Go to post's edit page">
                  {posts.post_title}
                </a>
              </legend>
              {posts.pages?.map((pages) => {
                return (
                  <>
                    <a href="#" title={pages.page_title}>
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
    </>
  );

  async function getData() {
    try {
      const res = await fetch("/api/posts/get-posts", {
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
}
export default post;
