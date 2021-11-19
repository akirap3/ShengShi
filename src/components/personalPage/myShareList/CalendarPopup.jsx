import React from 'react';

import { DialogOverlay } from '@reach/dialog';
import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  SubmitBtn,
} from '../../common/popup/PopupUnits';

import DateTimeRangeSelector from '../../common/DateTimeRangeSelector';

const ClendarPopup = ({ showCalender, closeCalendar }) => {
  return (
    <DialogOverlay isOpen={showCalender} onDismiss={closeCalendar}>
      <StyledDialogContent aria-label="popup">
        <PopClose onClick={closeCalendar} />
        <DateTimeRangeSelector />
        <ButtonContainer>
          <SubmitBtn onClick={closeCalendar}>確定</SubmitBtn>
        </ButtonContainer>
      </StyledDialogContent>
    </DialogOverlay>
  );
};

export default ClendarPopup;
