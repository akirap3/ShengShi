import React, { useEffect, useState } from 'react';
import ShareCard from '../common/ShareCard';
import CollectedSharePopup from '../personalPage/myCollectedList/CollectedSharePopup';

import { useSelector } from 'react-redux';

const SearchPageCard = ({ results }) => {
  const searchedShares = useSelector((state) => state.searchedShares);
  const [showEdit, setShowEdit] = useState(false);

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  useEffect(() => {}, []);

  return (
    searchedShares && (
      <>
        {searchedShares.length !== 0 ? (
          searchedShares.map((share) => (
            <>
              <ShareCard
                openEditor={openEditor}
                btnName="領取"
                cnannotDel={true}
                key={share.id}
                share={share}
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
    )
  );
};

export default SearchPageCard;
