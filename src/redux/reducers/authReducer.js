import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER
} from "../types";

const initialState = {
  token: null,
  userName: null,
  userFirebaseID: null
};

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: true
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        userFirebaseID: action.id,
        userName: action.name
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
}