const articles = (state = null, action) => {
  switch (action.type) {
    case 'articles/fetched':
      return action.payload;
    default:
      return state;
  }
};

export default articles;
