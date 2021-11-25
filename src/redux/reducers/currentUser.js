const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'currentUser/get':
      return action.payload;
    default:
      return state;
  }
};

export default currentUser;
