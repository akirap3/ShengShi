import { useState, useEffect } from 'react';

import useCurrentUser from '../../hooks/useCurrentUser';
import Main from '../common/Main';
import Banner from './components/Banner';
import Advantages from './components/Advantages';
import UserShares from './components/UserShares';
import Carousel from '../common/carousel/Carousel';
import { getAllContents, getAllOtherShares } from '../../utils/firebase';
import { useTranslation } from '../../context/LanguageContext';

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState();
  const [shares, setShares] = useState('');
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  useEffect(() => {
    return getAllContents('restaurants', setRestaurants);
  }, []);

  useEffect(() => {
    if (currentUser) {
      return getAllOtherShares('shares', setShares, currentUser);
    } else {
      return getAllContents('shares', setShares);
    }
  }, [currentUser]);

  return (
    <Main>
      <Banner />
      <Advantages />
      <UserShares />
      {restaurants && (
        <Carousel
          title={t('partners')}
          contentData={restaurants}
          isRestaurants={true}
        />
      )}
      {shares && <Carousel title={t('othersShares')} contentData={shares} />}
    </Main>
  );
};
export default LandingPage;
