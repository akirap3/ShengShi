import { useState } from 'react';

import ShareCard from '../../../common/ShareCard';
import ShareCardTag from '../../../common/ShareCard/components/ShareCardTag';
import CheckPopup from './CheckPopup';

const MyReceivedCard = ({ share }) => {
  const [showEdit, setShowEdit] = useState(false);
  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  return (
    <>
      <ShareCard
        handleClick={openEditor}
        Tag={ShareCardTag}
        isReceived="true"
        tagName="＃已領"
        share={share}
      />
      <CheckPopup showEdit={showEdit} closeEditor={closeEditor} share={share} />
    </>
  );
};

export default MyReceivedCard;
