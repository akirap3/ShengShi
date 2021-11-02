export const checkEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(email)) {
    alert('您的email 資料格式錯誤');
    return false;
  }
  return true;
};
