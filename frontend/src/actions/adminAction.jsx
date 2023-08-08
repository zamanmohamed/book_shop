import axios from "axios";

import {
  ADMIN_LIST_FAIL,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_REQUEST,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_CREATE_SUCCESS,
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_FAIL,
} from "../constants/adminConstants";

export const listAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LIST_REQUEST });
    const { data } = await axios.get(`/api/author/`);
    dispatch({ type: ADMIN_LIST_SUCCESS, payload: data.authors });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAdminetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DETAILS_REQUEST });
    const data = await axios.get(`/api/author/${id}`);
    dispatch({ type: ADMIN_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAdmin = (admin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/api/author`, admin);

    dispatch({
      type: ADMIN_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ADMIN_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateAdmin = (admin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_REQUEST,
    });

    const { data } = await axios.put(`/api/author/${admin._id}`, admin);

    dispatch({
      type: ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: ADMIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload: message,
    });
  }
};
