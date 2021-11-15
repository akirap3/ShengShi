import React from 'react';

import { DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { StyledDialogContent, PopClose } from '../../common/popup/PopupUnits';

import DateTimeRangeSelector from '../../common/DateTimeRangeSelector';

const ClendarPopup = ({ showCalender, closeCalendar }) => {
  return (
    <DialogOverlay isOpen={showCalender} onDismiss={closeCalendar}>
      <StyledDialogContent aria-label="popup">
        <PopClose onClick={closeCalendar} />
        <DateTimeRangeSelector />
      </StyledDialogContent>
    </DialogOverlay>
  );
};

export default ClendarPopup;
