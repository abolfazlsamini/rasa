import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../actions/auth";

const StateManage = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (isAuthenticated) return;
  console.log("state manager lunched");
  const dispatch = useDispatch();
  dispatch(verify());
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(verify());
  }, [dispatch]);
};

export default StateManage;
