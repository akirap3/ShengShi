import React, { useState } from 'react';

import '@reach/dialog/styles.css';

import EditPopup from './EditPopup';
import ShareCard from '../../common/ShareCard';

const MyShareList = () => {
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  return (
    <>
      <ShareCard openEditor={openEditor} />
      <EditPopup showEdit={showEdit} closeEditor={closeEditor} />
    </>
  );
};

export default MyShareList;
