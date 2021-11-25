const initialState = {
  isLoaded: false,
  isLoggedIn: undefined,
};

const checkUser = (state = initialState, action) => {
  switch (action.type) {
    case 'user/loggedIn':
      return {
        isLoaded: true,
        isLoggedIn: true,
      };
    case 'user/loggedOut':
      return {
        isLoaded: true,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default checkUser;
