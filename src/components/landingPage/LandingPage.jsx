import React, { useState, useEffect, useCallback } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import Main from '../common/Main';
import Banner from './Banner';
import Advantages from './Advantages';
import UserShares from './UserShares';
import Carousel from '../common/carousel/Carousel';
import { getAllContents, getAllOtherShares } from '../../utils/firebase';

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState();
  const [shares, setShares] = useState('');
  const currentUser = useCurrentUser();

  const getRestaurants = useCallback(() => {
    getAllContents('restaurants', setRestaurants);
  }, []);

  const getShares = useCallback(() => {
    getAllContents('shares', setShares);
  }, []);

  const getOtherShares = useCallback(() => {
    getAllOtherShares('shares', setShares, currentUser);
  }, [currentUser]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  useEffect(() => {
    if (currentUser) {
      return getOtherShares();
    } else {
      return getShares();
    }
  }, [getOtherShares, getShares, currentUser]);

  return (
    <Main>
      <Banner />
      <Advantages />
      <UserShares />
      {restaurants && (
        <Carousel
          title="合作餐廳"
          contentData={restaurants}
          isRestaurants={true}
        />
      )}
      {shares && <Carousel title="他人勝食分享" contentData={shares} />}
    </Main>
  );
};
export default LandingPage;
