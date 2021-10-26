import React, { useState } from 'react';
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
      />
    </>
  );
};

export default MyToReceiveList;
