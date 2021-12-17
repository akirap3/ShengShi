import { useState } from 'react';

import { useDispatch } from 'react-redux';

import ShareCard from '../../common/ShareCard';
import CollectedSharePopup from '../../personalPage/MyCollectedList/components/CollectedSharePopup';

const SearchPageCard = ({ share }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  const handleSearchOpen = (share) => {
    dispatch({
      type: 'specificDateTime/selected',
      payload: share?.fromTimeStamp.toDate(),
    });
    openEditor();
  };

  return share ? (
    <>
      <ShareCard
        handleClick={handleSearchOpen}
        btnName="領取"
        cannnotDel={true}
        share={share}
        isSearch={true}
      />
      <CollectedSharePopup
        showEdit={showEdit}
        closeEditor={closeEditor}
        share={share}
      />
    </>
  ) : null;
};

export default SearchPageCard;
