import React from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import DateTimeRangeSelector from '../../common/DateTimeRangeSelector';

import { AiFillCloseCircle } from 'react-icons/ai';

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

const StyledDialogContent = styled(DialogContent)`
  position: relative;
  width: 80vw;
  max-width: 800px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
`;

const PopClose = styled(AiFillCloseCircle)`
  fill: #1e88e582;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
`;

export default ClendarPopup;
