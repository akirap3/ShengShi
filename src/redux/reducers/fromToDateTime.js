const now = new Date();
const todayBegin = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours()
);
const todayEnd = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours() + 2
);

const fromToDateTime = (state = [todayBegin, todayEnd], action) => {
  switch (action.type) {
    case 'fromToDateTime/selected':
      return action.payload;
    case 'fromToDateTime/default':
      return [todayBegin, todayEnd];
    default:
      return state;
  }
};

export default fromToDateTime;
