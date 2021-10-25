import { Route, Switch, Redirect } from 'react-router-dom';
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
import Received from './components/personalPage/Received';
import ToReceive from './components/personalPage/toReceive';
import CollectedShares from './components/personalPage/CollectedShares';
import CollectedRestaurants from './components/personalPage/CollectedRestaurants';
import MemberUpdate from './components/memberUpdatePage/MemberUpdate';
import './App.css';
import Main from './components/common/Main';
import useCurrentUser from './hooks/useCurrentUser';

const App = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <Header />
      <Switch>
        <Route path="/personal">
          {console.log('currentUser:', currentUser)}
          {currentUser ? (
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
                  <Received />
                </Route>
                <Route exact path="/personal/toReceive">
                  <Title title="我的尚未領取清單"></Title>
                  <ToReceive />
                </Route>
                <Route exact path="/personal/collectedShares">
                  <Title title="我的收藏清單"></Title>
                  <CollectedShares />
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
          {currentUser ? <Redirect to="/personal/list" /> : <LoginPage />}
        </Route>
        <Route exact path="/signup">
          {currentUser ? <Redirect to="/personal/list" /> : <SignupPage />}
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
