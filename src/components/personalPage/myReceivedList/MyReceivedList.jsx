import React, { useState } from 'react';
import ShareCard from '../../common/ShareCard';
import ShareCardTag from '../../common/ShareCardTag';
import CheckPopup from './CheckPopup';

const MyReceivedList = () => {
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  return (
    <>
      <ShareCard
        openEditor={openEditor}
        Tag={ShareCardTag}
        isReceived="true"
        tagName="＃已領取"
      />
      <CheckPopup showEdit={showEdit} closeEditor={closeEditor} />
    </>
  );
};

export default MyReceivedList;
