import { useState } from 'react';

import ShareCard from '../../../common/ShareCard/';
import ShareCardTag from '../../../common/ShareCard/components/ShareCardTag';
import ConfirmedPopup from '../../../common/popup/ConfirmedPopup';
import { useTranslation } from '../../../../context/LanguageContext';

const MyToReceiveCard = ({ share }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { t } = useTranslation();
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);

  return (
    <>
      <ShareCard
        handleClick={openConfirmation}
        Tag={ShareCardTag}
        tagName={t('tagToReceive')}
        category={t('catReceive')}
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
