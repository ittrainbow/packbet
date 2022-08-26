import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER
} from '../types';

const initialState = {
  token: null,
  userName: null,
  userId: null,
  isAdmin: false
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
        isAdmin: action.value
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        userId: action.id,
        userName: action.name
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        isAdmin: false
      };

    default:
      return state;
  }
}