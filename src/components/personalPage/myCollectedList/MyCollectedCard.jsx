import React, { useState } from 'react';
import ShareCard from '../../common/ShareCard';
import ShareCardTag from '../../common/ShareCardTag';
import CollectedSharePopup from './CollectedSharePopup';

const MyCollectedCard = ({ share }) => {
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  return (
    <>
      <ShareCard
        openEditor={openEditor}
        Tag={ShareCardTag}
        tagName="#已收藏"
        btnName="領取"
        category="收藏"
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
