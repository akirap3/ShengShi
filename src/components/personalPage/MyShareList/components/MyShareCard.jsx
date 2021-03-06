import { useState, useEffect } from 'react';

import EditPopup from './EditPopup';
import ShareCard from '../../../common/ShareCard';
import { getListenedSingleContent } from '../../../../utils/firebase';

const MyShareCard = ({ share }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [listenedShare, setListenedShare] = useState(share);
  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  useEffect(() => {
    return getListenedSingleContent('shares', share.id, setListenedShare);
  }, [share.id]);

  return (
    <>
      <ShareCard
        handleClick={openEditor}
        btnName="編輯"
        category="分享"
        share={listenedShare}
      />
      <EditPopup
        showEdit={showEdit}
        closeEditor={closeEditor}
        share={listenedShare}
      />
    </>
  );
};

export default MyShareCard;
