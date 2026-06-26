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
import { useTranslation } from '../../../../context/LanguageContext';

const ClendarPopup = ({ showDateTime, closeDateTime, share }) => {
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { t } = useTranslation();

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);
  const now = new Date();

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
  };

  const handleCheckDateTime = () => {
    if (specificDateTime && specificDateTime < share.fromTimeStamp.toDate()) {
      openAlertWithMessage(t('errTimeTooEarly'));
    } else if (
      specificDateTime &&
      specificDateTime > share.toTimeStamp.toDate()
    ) {
      openAlertWithMessage(t('errTimeTooLate'));
    } else if (specificDateTime && specificDateTime < now) {
      openAlertWithMessage(t('errTimeInPast'));
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
              <SubmitBtn onClick={handleCheckDateTime}>{t('confirm')}</SubmitBtn>
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
