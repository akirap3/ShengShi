import React from 'react';

import { DialogOverlay } from '@reach/dialog';
import { StyledDialogContent, PopClose } from '../../common/popup/PopupUnits';

import DateTimeSelector from '../../common/DateTimeSelector';

const ClendarPopup = ({ showDateTime, closeDateTime, share }) => {
  return (
    <DialogOverlay isOpen={showDateTime} onDismiss={closeDateTime}>
      <StyledDialogContent aria-label="popup">
        <PopClose onClick={closeDateTime} />
        <DateTimeSelector share={share} />
      </StyledDialogContent>
    </DialogOverlay>
  );
};

export default ClendarPopup;
