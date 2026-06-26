import { useState } from 'react';

import { useDispatch } from 'react-redux';

import ShareCard from '../../../common/ShareCard';
import ShareCardTag from '../../../common/ShareCard/components/ShareCardTag';
import CollectedSharePopup from './CollectedSharePopup';
import { useTranslation } from '../../../../context/LanguageContext';

const MyCollectedCard = ({ share }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const { t } = useTranslation();

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  const handleCollectedOpen = (share) => {
    dispatch({
      type: 'specificDateTime/selected',
      payload: share?.fromTimeStamp.toDate(),
    });
    openEditor();
  };

  return (
    <>
      <ShareCard
        handleClick={handleCollectedOpen}
        Tag={ShareCardTag}
        tagName={t('tagSaved')}
        btnName={t('btnBook')}
        category={t('catSaved')}
        isCollected={true}
        share={share}
      />
      <CollectedSharePopup
        showEdit={showEdit}
        closeEditor={closeEditor}
        share={share}
      />
    </>
  );
};

export default MyCollectedCard;
