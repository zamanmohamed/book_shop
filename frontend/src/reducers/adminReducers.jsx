import {
  ADMIN_LIST_FAIL,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_REQUEST,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_RESET,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
  ADMIN_UPDATE_RESET,
} from "../constants/adminConstants";

export const adminListReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true, admins: [] };
    case ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        admins: action.payload,
      };
    case ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminDetailsReducer = (
  state = { admin: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ADMIN_DETAILS_SUCCESS:
      return { loading: false, admin: action.payload };
    case ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_CREATE_SUCCESS:
      return { loading: false, success: true, admin: action.payload };
    case ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUpdateReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true, admin: action.payload };
    case ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_RESET:
      return { admin: {} };
    default:
      return state;
  }
};
