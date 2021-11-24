import { useState } from 'react';
import ShareCard from '../../common/ShareCard';
import ShareCardTag from '../../common/ShareCardTag';
import ConfirmedPopup from '../../common/ConfirmedPopup';

const MyToReceiveCard = ({ share }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);

  return (
    <>
      <ShareCard
        handleClick={openConfirmation}
        Tag={ShareCardTag}
        tagName="#未領"
        category="領取"
        share={share}
        isToReceive={true}
      />
      <ConfirmedPopup
        showConfirmation={showConfirmation}
        closeConfirmation={closeConfirmation}
        hasUpdateBtn={true}
        share={share}
      />
    </>
  );
};

export default MyToReceiveCard;
