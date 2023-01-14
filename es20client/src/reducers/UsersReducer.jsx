export default (
  state = {
    isLoggedIn: false,
    id: null,
    username: '',
    user_object: null,
    cookie: null
  },
  action
) => {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log('LOGIN_USER', action);
      return {
        isLoggedIn: true,
        id: action.user.id,
        username: action.user.username,
        user_object: action.user
      };
    case 'LOGOUT_USER':
      console.log('LOGOUT_USER', action);
      return {
        isLoggedIn: false,
        id: null,
        username: '',
        user_object: null
      };
    case 'FETCH_COOKIE':
      console.log('FETCH_COOKIE reducer', action);
      return { ...state, cookie: action.payload.data.cookie };
    default:
      return state;
  }
};