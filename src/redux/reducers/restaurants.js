const restaurants = (state = null, action) => {
  switch (action.type) {
    case 'restaurants/fetched':
      return action.payload;
    default:
      return state;
  }
};

export default restaurants;
