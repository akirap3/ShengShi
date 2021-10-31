import React, { useState, useEffect, useCallback } from 'react';
import Main from '../common/Main';
import Banner from './Banner';
import Advantages from './Advantages';
import UserShares from './UserShares';
import Carousel from '../common/Carousel';
import { getAllContents } from '../../utils/firebase';

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState();
  const [shares, setShares] = useState();

  const getRestaurants = useCallback(() => {
    getAllContents('restaurants', setRestaurants);
  }, []);

  const getShares = useCallback(() => {
    getAllContents('shares', setShares);
  }, []);

  useEffect(() => {
    return getRestaurants();
  }, [getRestaurants]);

  useEffect(() => {
    return getShares();
  }, [getShares]);

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
