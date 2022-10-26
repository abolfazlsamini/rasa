import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHORIZED_SUCCESS,
  AUTHORIZED_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";
import swal from "sweetalert";

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
  });

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
      swal("loggin failed", "couldn't log you in", "error");
    }
  } catch (err) {
    swal("loggin failed", "couldn't log you in", "error");
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const verify = () => async (dispatch) => {
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("verifying");
    if (res.status === 200) {
      dispatch({
        type: AUTHORIZED_SUCCESS,
      });
    } else {
      console.log("elseeeeeee");
      // dispatch({
      //   type: AUTHORIZED_FAIL,
      // });
      dispatch(logout());
    }
  } catch (err) {
    console.log(err);
    dispatch(logout());
  }
};
export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("loging Out");
    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
      swal(
        "logout faild!",
        "idk man even i'm suprised how'd this happend, you shouldn't have been able to seen this",
        "error"
      );
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGOUT_FAIL,
    });
    swal(
      "logout faild!",
      "idk man even i'm suprised how'd this happend, you shouldn't have even seen this",
      "error"
    );
  }
};
