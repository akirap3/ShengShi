const isShareSearch = (state = false, action) => {
  switch (action.type) {
    case 'isShareSearch/search':
      return action.payload;
    default:
      return state;
  }
};

export default isShareSearch;
