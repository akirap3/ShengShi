import React, { useState } from 'react';
import ShareCard from '../common/ShareCard';
import CollectedSharePopup from '../personalPage/myCollectedList/CollectedSharePopup';
import { getSingleShare } from '../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';

const SearchPageCard = ({ results }) => {
  const dispatch = useDispatch();
  const searchedShares = useSelector((state) => state.searchedShares);
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);
  console.log(results);
  const contents = results.map((result) => getSingleShare(result.docId));
  console.log(contents);
  Promise.all(contents).then((values) => {
    console.log(values);
    // dispatch({ type: 'searchedShares/get', payload: values });
  });

  return (
    searchedShares && (
      <>
        {searchedShares.map((share) => (
          <>
            <ShareCard
              openEditor={openEditor}
              btnName="領取"
              cnannotDel={true}
              share={share}
            />
            <CollectedSharePopup
              showEdit={showEdit}
              closeEditor={closeEditor}
              share={share}
            />
          </>
        ))}
      </>
    )
  );
};

export default SearchPageCard;
