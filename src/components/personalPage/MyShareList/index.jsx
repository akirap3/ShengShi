import { useState, useEffect } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/ShareCard/components/SharesContainer';
import Outer from '../../common/Outer';
import MyShareCard from './components/MyShareCard';
import NoResult from '../../common/NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import { getSpecificContents } from '../../../utils/firebase';
import { useTranslation } from '../../../context/LanguageContext';

const MyShareList = () => {
  const [shares, setShares] = useState(null);
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  useEffect(() => {
    return getSpecificContents(
      'shares',
      'postUser.id',
      '==',
      'desc',
      currentUser,
      setShares
    );
  }, [currentUser]);

  return (
    <>
      {shares ? (
        <>
          {shares.length !== 0 ? (
            <Outer>
              <SharesContainer>
                {shares
                  .filter((share) => share.isArchived === false)
                  .map((share) => (
                    <MyShareCard key={share.id} share={share} />
                  ))}
              </SharesContainer>
            </Outer>
          ) : (
            <NoResult text={t('noSharedItems')} />
          )}
        </>
      ) : (
        <HalfHeightPaddingLoading>
          <Loading />
        </HalfHeightPaddingLoading>
      )}
    </>
  );
};

export default MyShareList;
