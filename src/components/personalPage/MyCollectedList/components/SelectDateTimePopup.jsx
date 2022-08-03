import { useState } from 'react';

import Ripples from 'react-ripples';
import { useSelector } from 'react-redux';
import { DialogOverlay } from '@reach/dialog';

import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';
import AlertPopup from '../../../common/popup/AlertPopup';
import DateTimeSelector from '../../../common/dateTime/DateTimeSelector';

const ClendarPopup = ({ showDateTime, closeDateTime, share }) => {
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);
  const now = new Date();

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
  };

  const handleCheckDateTime = () => {
    if (specificDateTime && specificDateTime < share.fromTimeStamp.toDate()) {
      openAlertWithMessage('領取時間小於可領取的開始時間，請重新選擇領取時間');
    } else if (
      specificDateTime &&
      specificDateTime > share.toTimeStamp.toDate()
    ) {
      openAlertWithMessage('領取時間大於可領取的結束時間，請重新選擇領取時間');
    } else if (specificDateTime && specificDateTime < now) {
      openAlertWithMessage('領取時間小於現在時間，請重新選擇領取時間');
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
            <Ripples color="#fff" during={3000}>
              <SubmitBtn onClick={handleCheckDateTime}>確認</SubmitBtn>
            </Ripples>
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
