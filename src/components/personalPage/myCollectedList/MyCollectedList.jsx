import React, { useState } from 'react';
import ShareCard from '../../common/ShareCard';
import ShareCardTag from '../../common/ShareCardTag';
import CollectedSharePopup from './CollectedSharePopup';

const MyCollectedList = () => {
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  return (
    <>
      <ShareCard openEditor={openEditor} Tag={ShareCardTag} tagName="#已收藏" />
      <CollectedSharePopup showEdit={showEdit} closeEditor={closeEditor} />
    </>
  );
};

export default MyCollectedList;
