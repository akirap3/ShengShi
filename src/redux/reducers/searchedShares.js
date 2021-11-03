const searchedShares = (state = '', action) => {
  switch (action.type) {
    case 'searchedShares/get':
      return action.payload;
    default:
      return state;
  }
};

export default searchedShares;
