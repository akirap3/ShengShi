import { useState } from 'react';

import { useSelector } from 'react-redux';
import Ripples from 'react-ripples';
import { DialogOverlay } from '@reach/dialog';

import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';
import AlertPopup from '../../../common/popup/AlertPopup';
import DateTimeRangeSelector from '../../../common/dateTime/DateTimeRangeSelector';
import { useTranslation } from '../../../../context/LanguageContext';

const ClendarPopup = ({ showCalender, closeCalendar }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  const { t } = useTranslation();

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);
  const now = new Date();

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
  };

  const handleCheckDateTimeRange = () => {
    if (fromToDateTime && fromToDateTime[1] < fromToDateTime[0]) {
      openAlertWithMessage(t('errEndTimeTooEarly'));
    } else if (fromToDateTime && fromToDateTime[0] <= now) {
      openAlertWithMessage(t('errStartTimeInPast'));
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
            <Ripples color="#fff" during={3000}>
              <SubmitBtn onClick={handleCheckDateTimeRange}>{t('submit')}</SubmitBtn>
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
