const latLng = (state = [], action) => {
  switch (action.type) {
    case 'latLng/get':
      return action.payload;
    default:
      return state;
  }
};

export default latLng;
