import React from 'react';
import Main from '../common/Main';
import Banner from './Banner';
import Advantages from './Advantages';
import UserShares from './UserShares';
import Carousel from '../common/Carousel';
import useRestaurants from '../../hooks/useRestaurants';
import useShares from '../../hooks/useShares';

const LandingPage = () => {
  const restaurants = useRestaurants();
  const shares = useShares();

  return (
    <Main>
      <Banner />
      <Advantages />
      <UserShares />
      <Carousel title="合作餐廳" contentData={restaurants} />
      <Carousel title="他人勝食分享" contentData={shares} />
    </Main>
  );
};

export default LandingPage;
