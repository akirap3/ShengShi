import { useState, useEffect } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './components/MyRecievedCard';
import SharesContainer from '../../common/ShareCard/components/SharesContainer';
import Outer from '../../common/Outer';
import NoResult from '../../common/NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import { getSpecificContents } from '../../../utils/firebase';
import { useTranslation } from '../../../context/LanguageContext';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    return getSpecificContents(
      'shares',
      'receivedUserId',
      'array-contains',
      'desc',
      currentUser,
      setReceivedShares
    );
  }, [currentUser]);

  return (
    <>
      {receivedShares ? (
        <>
          {receivedShares.length !== 0 ? (
            <Outer>
              <SharesContainer>
                {receivedShares.map((share) => (
                  <MyReceivedCard key={share.id} share={share} />
                ))}
              </SharesContainer>
            </Outer>
          ) : (
            <NoResult text={t('noReceivedRecord')} />
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

export default MyReceivedList;
