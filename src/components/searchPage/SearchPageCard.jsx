import React, { useEffect, useState, useCallback } from 'react';
import ShareCard from '../common/ShareCard';
import CollectedSharePopup from '../personalPage/myCollectedList/CollectedSharePopup';
import useCurrentUser from '../../hooks/useCurrentUser';
import { getAllContents, getAllOtherShares } from '../../utils/firebase';

import { useDispatch, useSelector } from 'react-redux';

const SearchPageCard = () => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const searchedShares = useSelector((state) => state.searchedShares);
  const [shares, setShares] = useState();
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  const getShares = useCallback(() => {
    getAllContents('shares', setShares);
  }, []);

  const getOtherShares = useCallback(() => {
    getAllOtherShares('shares', setShares, currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      return getOtherShares();
    } else {
      return getShares();
    }
  }, [getOtherShares, getShares, currentUser]);

  useEffect(() => {
    if (searchedShares) {
      const otherShares = searchedShares.filter(
        (share) => share.postUser.id !== currentUser?.uid
      );
      setShares(otherShares);
    }
  }, [currentUser?.uid, searchedShares]);

  const handleSearchOpen = (share) => {
    dispatch({
      type: 'specificDateTime/selected',
      payload: share?.fromTimeStamp.toDate(),
    });
    openEditor();
  };

  return shares ? (
    <>
      {shares.length !== 0 ? (
        shares.map((share) => (
          <>
            <ShareCard
              handleClick={handleSearchOpen}
              btnName="領取"
              cnannotDel={true}
              key={share.id}
              share={share}
              isSearch={true}
            />
            <CollectedSharePopup
              showEdit={showEdit}
              closeEditor={closeEditor}
              share={share}
            />
          </>
        ))
      ) : (
        <div>搜尋不到</div>
      )}
    </>
  ) : (
    <div>搜尋不到</div>
  );
};

export default SearchPageCard;
