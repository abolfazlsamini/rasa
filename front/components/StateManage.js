import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../actions/auth";

const StateManage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(verify());
  }, [dispatch]);
};

export default StateManage;
