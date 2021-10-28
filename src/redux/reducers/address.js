const address = (state = '', action) => {
  switch (action.type) {
    case 'address/get':
      return action.payload;
    default:
      return state;
  }
};

export default address;
