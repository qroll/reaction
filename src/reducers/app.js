export const SESSION_STATUS = {
  CHECKING: "LOADING",
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT"
};

const INITIAL_STATE = {
  session: SESSION_STATUS.LOADING
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHECK_SESSION":
      return {
        ...state,
        session: SESSION_STATUS.LOADING
      };
    case "LOGIN_USER":
      return {
        ...state,
        session: SESSION_STATUS.LOGGED_IN
      };
    case "LOGOUT_USER":
      return {
        ...state,
        session: SESSION_STATUS.LOGGED_OUT
      };
    default:
      return state;
  }
};

export default user;
