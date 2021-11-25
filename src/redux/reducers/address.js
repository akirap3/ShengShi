const address = (state = '台北市', action) => {
  switch (action.type) {
    case 'address/get':
      return action.payload;
    default:
      return state;
  }
};

export default address;
