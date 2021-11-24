import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/Footer';
import Loading, { PaddingLoading } from './components/common/Loading';
import LandingPage from './components/landingPage/LandingPage';
import RestaurantPage from './components/restaurantPage/RestaurantPage';
import ArticlePage from './components/articlePage/ArticlePage';
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
import MemberUpdate from './components/personalPage/memberUpdatePage/MemberUpdate';
import QRcodeComfirmPage from './components/qrcodeConfirmPage/QRcodeConfirmPage';
import MyMgmtList from './components/personalPage/myMgmtPage/MyMgmtList';
import Notification from './components/personalPage/myNotification/Notification';
import ErrorPage from './components/ErrorPage';
import Main from './components/common/Main';
import useCheckUser from './hooks/useCheckUser';

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
                    <Title title="我的統計與勳章"></Title>
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
                  <Route exact path="/personal/mgmt">
                    <Title title="領取列表管理"></Title>
                    <MyMgmtList />
                  </Route>
                  <Route exact path="/personal/notification">
                    <Title title="我的訊息"></Title>
                    <Notification />
                  </Route>
                  <Route exact path="/personal/:shareId/:requesterId">
                    <QRcodeComfirmPage />
                  </Route>
                  <Route path="/">
                    <ErrorPage />
                  </Route>
                </Switch>
              </Main>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/restaurants">
            <RestaurantPage />
          </Route>
          <Route exact path="/articles">
            <ArticlePage />
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
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/">
            <ErrorPage padding="100px" />
          </Route>
        </Switch>
      ) : (
        <PaddingLoading>
          <Loading />
        </PaddingLoading>
      )}
      <Footer />
    </>
  );
};

export default App;
