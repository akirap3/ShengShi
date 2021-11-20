export const checkEmail = (email, setAlertMessage, openInfo) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(email)) {
    setAlertMessage('您的email 資料格式錯誤');
    openInfo();
    return false;
  }
  return true;
};

export const isFieldsChecked = (
  foodName,
  quantities,
  fromToDateTime,
  address,
  file,
  setAlertMessage,
  openInfo
) => {
  const newQty = Number(quantities);
  if (!foodName) {
    setAlertMessage('請輸入食物名稱');
    openInfo();
    return false;
  } else if (isNaN(newQty) || !newQty) {
    setAlertMessage('數量請輸入數字 1 ~ 999 的數字');
    openInfo();
    return false;
  } else if (newQty <= 0 || newQty > 999) {
    setAlertMessage('請輸入介於 1 ~ 999 的數字');
    openInfo();
    return false;
  } else if (fromToDateTime === null) {
    setAlertMessage('請點選日期時間區間');
    openInfo();
    return false;
  } else if (address === '台北市' || !address) {
    setAlertMessage('請點選地點標示取得地址');
    openInfo();
    return false;
  } else if (!file) {
    setAlertMessage('請上傳食物圖片');
    openInfo();
    return false;
  }
  return true;
};
