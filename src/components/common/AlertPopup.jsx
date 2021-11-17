import React from 'react';

import {
  CenterDialogOverlay,
  AlertDialogContent,
  PopClose,
  PopTitleContainer,
  PopTitle,
  AlertBtnRow,
  SubmitBtn,
  InfoIcon,
} from './popup/PopupUnits';

const AlertPopup = ({ showInfo, closeInfo, message }) => {
  return (
    <CenterDialogOverlay isOpen={showInfo} onDismiss={closeInfo}>
      <AlertDialogContent aria-label="delete-popup">
        <PopClose onClick={closeInfo} />
        <PopTitleContainer>
          <InfoIcon />
          <PopTitle>{message}</PopTitle>
        </PopTitleContainer>
        <AlertBtnRow>
          <SubmitBtn onClick={closeInfo}>確認</SubmitBtn>
        </AlertBtnRow>
      </AlertDialogContent>
    </CenterDialogOverlay>
  );
};

export default AlertPopup;
