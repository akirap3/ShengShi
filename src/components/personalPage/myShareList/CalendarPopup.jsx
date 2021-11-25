import { useState } from 'react';

import { useSelector } from 'react-redux';
import { DialogOverlay } from '@reach/dialog';

import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  StyleBtnRipples,
  SubmitBtn,
} from '../../common/popup/PopupUnits';
import AlertPopup from '../../common/AlertPopup';
import DateTimeRangeSelector from '../../common/DateTimeRangeSelector';

const ClendarPopup = ({ showCalender, closeCalendar }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const fromToDateTime = useSelector((state) => state.fromToDateTime);

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);
  const now = new Date();

  const handleCheckDateTimeRange = () => {
    if (fromToDateTime && fromToDateTime[1] < fromToDateTime[0]) {
      setAlertMessage('結束時間小於開始時間，請重新選擇結束時間');
      openInfo();
    } else if (fromToDateTime && fromToDateTime[0] <= now) {
      setAlertMessage('開始時間小於現在時間，請重新選擇開始時間');
      openInfo();
    } else {
      closeCalendar();
    }
  };

  return (
    <>
      <DialogOverlay isOpen={showCalender} onDismiss={closeCalendar}>
        <StyledDialogContent aria-label="popup">
          <PopClose onClick={handleCheckDateTimeRange} />
          <DateTimeRangeSelector />
          <ButtonContainer>
            <StyleBtnRipples color="#fff" during={3000}>
              <SubmitBtn onClick={handleCheckDateTimeRange}>確定</SubmitBtn>
            </StyleBtnRipples>
          </ButtonContainer>
        </StyledDialogContent>
      </DialogOverlay>
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

export default ClendarPopup;
