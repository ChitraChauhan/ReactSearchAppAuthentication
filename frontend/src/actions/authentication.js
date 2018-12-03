import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_CURRENT_PROFILE,
  GET_PROFILE_ERRORS
} from "./types";
import setAuthToken from "../setAuthToken";

export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/users/register", user)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user, history) => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded, user));
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    user: user
  };
};

export const setCurrentProfile = decoded => {
  return {
    type: SET_CURRENT_PROFILE,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history && history.push("/login");
};

export const registerProfile = (profile, history) => dispatch => {
  axios
    .post("/api/profiles/profileRegistration", profile)
    .then(res => {
      history.push("/member");
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE_ERRORS,
        payload: err.response.data
      });
    });
};

export const resetPassword = (user, history) => dispatch => {
  axios
    .post("/api/users/reset", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded, user));
      history.push("/login"); 
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const forgotPassword = (user, history) => dispatch => {
  axios
    .post("/api/users/forgot", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded, user));
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
