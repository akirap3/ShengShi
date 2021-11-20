import React, { useState } from 'react';

import { DialogOverlay } from '@reach/dialog';
import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  SubmitBtn,
} from '../../common/popup/PopupUnits';
import AlertPopup from '../../common/AlertPopup';

import DateTimeSelector from '../../common/DateTimeSelector';
import { useSelector } from 'react-redux';

const ClendarPopup = ({ showDateTime, closeDateTime, share }) => {
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);
  const now = new Date();

  const handleCheckDateTime = () => {
    if (specificDateTime && specificDateTime < share.fromTimeStamp.toDate()) {
      setAlertMessage('領取時間小於可領取的開始時間，請重新選擇領取時間');
      openInfo();
    } else if (
      specificDateTime &&
      specificDateTime > share.toTimeStamp.toDate()
    ) {
      setAlertMessage('領取時間大於可領取的結束時間，請重新選擇領取時間');
      openInfo();
    } else if (specificDateTime && specificDateTime < now) {
      setAlertMessage('領取時間小於現在時間，請重新選擇領取時間');
      openInfo();
    } else {
      closeDateTime();
    }
  };

  return (
    <>
      <DialogOverlay isOpen={showDateTime} onDismiss={closeDateTime}>
        <StyledDialogContent aria-label="popup">
          <PopClose onClick={handleCheckDateTime} />
          <DateTimeSelector share={share} />
          <ButtonContainer>
            <SubmitBtn onClick={handleCheckDateTime}>確認</SubmitBtn>
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
