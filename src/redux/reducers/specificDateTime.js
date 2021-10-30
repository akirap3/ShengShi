const specificDateTime = (state = null, action) => {
  switch (action.type) {
    case 'specificDateTime/selected':
      return action.payload;
    default:
      return state;
  }
};

export default specificDateTime;
