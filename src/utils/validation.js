export const checkEmail = (email, openAlertWithMessage, t) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(email)) {
    return openAlertWithMessage(t ? t('errInvalidEmail') : '您的email 資料格式錯誤');
  }
  return true;
};

export const isFieldsChecked = (
  foodName,
  quantities,
  fromToDateTime,
  address,
  file,
  openAlertWithMessage,
  t
) => {
  const newQty = Number(quantities);
  if (!foodName) {
    return openAlertWithMessage(t ? t('errEnterFoodName') : '請輸入食物名稱');
  } else if (isNaN(newQty) || !newQty) {
    return openAlertWithMessage(t ? t('errEnterQtyNumber') : '數量請輸入數字 1 ~ 999 的數字');
  } else if (newQty <= 0 || newQty > 999) {
    return openAlertWithMessage(t ? t('errEnterQtyNumber') : '請輸入介於 1 ~ 999 的數字');
  } else if (fromToDateTime === null) {
    return openAlertWithMessage(t ? t('errSelectDateTimeRange') : '請點選日期時間區間');
  } else if (address === '台北市' || !address) {
    return openAlertWithMessage(t ? t('errSelectLocation') : '請點選地點標示取得地址');
  } else if (!file) {
    return openAlertWithMessage(t ? t('errUploadFoodImage') : '請上傳食物圖片');
  }
  return true;
};

