const shares = (state = null, action) => {
  switch (action.type) {
    case 'shares/fetched':
      return action.payload;
    default:
      return state;
  }
};

export default shares;
