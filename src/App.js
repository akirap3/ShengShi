import { Route, Switch } from 'react-router-dom';
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
import ShareCards from './components/personalPage/ShareCards';
import Badges from './components/personalPage/Badges';
import Received from './components/personalPage/Received';
import ToReceive from './components/personalPage/toReceive';
import CollectedShares from './components/personalPage/CollectedShares';
import CollectedRestaurants from './components/personalPage/CollectedRestaurants';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/personal">
          <Dashbaord></Dashbaord>
          <Title></Title>
          <Switch>
            <Route exact path="/personal/list">
              <ShareCards />
            </Route>
            <Route exact path="/personal/badges">
              <Badges />
            </Route>
            <Route exact path="/personal/received">
              <Received />
            </Route>
            <Route exact path="/personal/toReceive">
              <ToReceive />
            </Route>
            <Route exact path="/personal/collectedShares">
              <CollectedShares />
            </Route>
            <Route exact path="/personal/collectedRestaurants">
              <CollectedRestaurants />
            </Route>
          </Switch>
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
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
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
