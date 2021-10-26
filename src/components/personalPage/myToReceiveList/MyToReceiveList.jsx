import React, { useState } from 'react';
import styled from 'styled-components';
import ShareCard from '../../common/ShareCard';
import ShareCardTag from '../../common/ShareCardTag';
import ConfirmedPopup from '../../common/ConfirmedPopup';

const MyToReceiveList = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);

  return (
    <>
      <ShareCard
        openEditor={openConfirmation}
        Tag={ShareCardTag}
        tagName="#未領取"
      />
      <ConfirmedPopup
        showConfirmation={showConfirmation}
        closeConfirmation={closeConfirmation}
        UpdateBtn={UpdateBtn}
      />
    </>
  );
};

const UpdateBtn = styled.button`
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  background-color: lightskyblue;
  color: white;
  cursor: pointer;
  padding: 1vw;
  margin-top: 2vw;
  letter-spacing: 0.5vw;
  text-align: center;
`;

export default MyToReceiveList;
