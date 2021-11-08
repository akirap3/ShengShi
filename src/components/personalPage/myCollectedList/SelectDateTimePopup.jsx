import React from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';

import DateTimeSelector from '../../common/DateTimeSelector';

import { AiFillCloseCircle } from 'react-icons/ai';

const ClendarPopup = ({ showDateTime, closeDateTime, share }) => {
  return (
    <DialogOverlay isOpen={showDateTime} onDismiss={closeDateTime}>
      <DialogContent
        style={{
          position: 'relative',
          border: 'solid 1px lightBlue',
          borderRadius: '10px',
        }}
        aria-label="popup"
      >
        <PopClose onClick={closeDateTime} />
        <DateTimeSelector share={share} />
      </DialogContent>
    </DialogOverlay>
  );
};

const StyledColse = styled(AiFillCloseCircle)`
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const PopClose = styled(StyledColse)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
`;

export default ClendarPopup;
