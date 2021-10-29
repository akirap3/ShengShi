import React, { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from '@firebase/firestore';

import EditPopup from './EditPopup';
import ShareCard from '../../common/ShareCard';

const MyShareCard = ({ share }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [listenedShare, setListenedShare] = useState(share);
  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(getFirestore(), 'shares', share.id),
      (doc) => {
        const updatedData = { ...doc.data(), id: doc.id };
        setListenedShare(updatedData);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [share.id]);

  return (
    <>
      <ShareCard
        openEditor={openEditor}
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
