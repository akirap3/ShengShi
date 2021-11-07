export const checkEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(email)) {
    alert('您的email 資料格式錯誤');
    return false;
  }
  return true;
};

export const isFieldsChecked = (foodName, quantities, address, file) => {
  const newQty = Number(quantities);
  if (!foodName) {
    alert('請輸入食物名稱');
    return false;
  } else if (isNaN(newQty) || !newQty) {
    alert('數量請輸入數字 1 ~ 999 的數字');
    return false;
  } else if (newQty <= 0 || newQty > 999) {
    alert('請輸入介於 1 ~ 999 的數字');
    return false;
  } else if (address === '台北市' || !address) {
    alert('請點選地點標示取得地址');
    return false;
  } else if (!file) {
    alert('請上傳食物圖片');
    return false;
  }
  return true;
};
