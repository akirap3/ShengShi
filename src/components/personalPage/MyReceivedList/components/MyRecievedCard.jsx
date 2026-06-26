import { useState } from 'react';

import ShareCard from '../../../common/ShareCard';
import ShareCardTag from '../../../common/ShareCard/components/ShareCardTag';
import CheckPopup from './CheckPopup';
import { useTranslation } from '../../../../context/LanguageContext';

const MyReceivedCard = ({ share }) => {
  const [showEdit, setShowEdit] = useState(false);
  const { t } = useTranslation();
  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  return (
    <>
      <ShareCard
        handleClick={openEditor}
        Tag={ShareCardTag}
        isReceived="true"
        tagName={t('tagReceived')}
        share={share}
      />
      <CheckPopup showEdit={showEdit} closeEditor={closeEditor} share={share} />
    </>
  );
};

export default MyReceivedCard;
