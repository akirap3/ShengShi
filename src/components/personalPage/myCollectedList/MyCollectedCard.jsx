import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ShareCard from '../../common/ShareCard';
import ShareCardTag from '../../common/ShareCardTag';
import CollectedSharePopup from './CollectedSharePopup';

const MyCollectedCard = ({ share }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);

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
        tagName="#收藏"
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
