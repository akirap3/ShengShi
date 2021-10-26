import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './components/landingPage/LandingPage';
import RestaurantPage from './components/restaurantPage/RestaurantPage';
import ArticlePage from './components/articlePage/ArticlePage';
import AboutPage from './components/aboutPage/AboutPage';
import ContactPage from './components/contactPage/ContactPage';
import SearchPage from './components/searchPage/SearchPage';
import LoginPage from './components/loginPage/LoginPage';
import SignupPage from './components/signupPage/SingupPage';
import Dashbaord from './components/personalPage/Dashboard';
import Title from './components/personalPage/Title';
import MyShareList from './components/personalPage/myShareList/MyShareList';
import Badges from './components/personalPage/Badges';
import MyReceivedList from './components/personalPage/myReceivedList/MyReceivedList';
import MyToReceiveList from './components/personalPage/myToReceiveList/MyToReceiveList';
import MyCollectedList from './components/personalPage/myCollectedList/MyCollectedList';
import CollectedRestaurants from './components/personalPage/CollectedRestaurants';
import MemberUpdate from './components/memberUpdatePage/MemberUpdate';

import './App.css';
import '@reach/dialog/styles.css';

import Main from './components/common/Main';
import useCheckUser from './hooks/useCheckUser';
import ReactLoading from 'react-loading';

const App = () => {
  const { isLoaded, isLoggedIn } = useCheckUser();

  return (
    <>
      <Header />
      {isLoaded ? (
        <Switch>
          <Route path="/personal">
            {isLoggedIn ? (
              <Main>
                <Dashbaord></Dashbaord>
                <Switch>
                  <Route exact path="/personal/list">
                    <Title title="我的分享清單"></Title>
                    <MyShareList />
                  </Route>
                  <Route exact path="/personal/badges">
                    <Title title="我的勳章"></Title>
                    <Badges />
                  </Route>
                  <Route exact path="/personal/received">
                    <Title title="我已領取的清單"></Title>
                    <MyReceivedList />
                  </Route>
                  <Route exact path="/personal/toReceive">
                    <Title title="我的尚未領取清單"></Title>
                    <MyToReceiveList />
                  </Route>
                  <Route exact path="/personal/collectedShares">
                    <Title title="我的收藏清單"></Title>
                    <MyCollectedList />
                  </Route>
                  <Route exact path="/personal/collectedRestaurants">
                    <Title title="我的收藏店家"></Title>
                    <CollectedRestaurants />
                  </Route>
                  <Route exact path="/personal/memberUpdate">
                    <Title title="個人資料更新"></Title>
                    <MemberUpdate />
                  </Route>
                </Switch>
              </Main>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/restaurants">
            <RestaurantPage />
          </Route>
          <Route exact path="/articles">
            <ArticlePage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/contact">
            <ContactPage />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <Route exact path="/login">
            {isLoggedIn ? <Redirect to="/personal/list" /> : <LoginPage />}
          </Route>
          <Route exact path="/signup">
            {isLoggedIn ? <Redirect to="/personal/list" /> : <SignupPage />}
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      ) : (
        <StyledLoading
          type={'spin'}
          color={'#2a9d8f'}
          height={'10vw'}
          width={'10vw'}
        />
      )}
      )
      <Footer />
    </>
  );
};

const StyledLoading = styled(ReactLoading)`
  display: flex;
  position: absolute;
  z-index: 10;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

export default App;
