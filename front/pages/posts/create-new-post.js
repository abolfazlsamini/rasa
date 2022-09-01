import axios from "axios";
import StateManage from "../../components/stateManage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../../actions/auth";
function post({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (!isAuthenticated) dispatch(verify());
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/profile/login");
  }

  function pageView(id) {
    data?.map((posts) => {
      if (posts.id === id) {
        return (
          <>
            {posts.pages?.map((pages) => {
              {
                return (
                  <>
                    {pages.page_title}
                    <br />
                  </>
                );
              }
            })}
            <br />
          </>
        );
      } else return null;
    });
  }
  return (
    <>
      <StateManage />
      {data?.map((posts) => {
        return (
          <div className="treeview w-20 border">
            <ul className="list-group">
              <li className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="listGroupRadio"
                  value=""
                  id="firstRadio"
                  checked
                  pageView
                />
                <label className="form-check-label" htmlFor="firstRadio">
                  {posts.post_title}
                </label>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default post;
