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
import ListPage from './components/personalPage/ListPage';
import BadgesPage from './components/personalPage/BadgesPage';
import ReceivedPage from './components/personalPage/ReceivedPage';
import ToReceivePage from './components/personalPage/toReceivePage';
import CollectedSharesPage from './components/personalPage/CollectedSharesPage';
import CollectedRestaurantsPage from './components/personalPage/CollectedRestaurantsPage';

import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
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
        <Route exact path="/personal/list">
          <ListPage />
        </Route>
        <Route exact path="/personal/badges">
          <BadgesPage />
        </Route>
        <Route exact path="/personal/received">
          <ReceivedPage />
        </Route>
        <Route exact path="/personal/toReceive">
          <ToReceivePage />
        </Route>
        <Route exact path="/personal/collectedShares">
          <CollectedSharesPage />
        </Route>
        <Route exact path="/personal/collectedRestaurants">
          <CollectedRestaurantsPage />
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
