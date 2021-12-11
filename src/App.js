import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loading, { PaddingLoading } from './components/common/Loading';
import useCheckUser from './hooks/useCheckUser';
import Header from './components/common/header/Header';
import Footer from './components/common/Footer';
import Main from './components/common/Main';

const LandingPage = lazy(() => import('./components/landingPage/LandingPage'));
const RestaurantPage = lazy(() =>
  import('./components/restaurantPage/RestaurantPage')
);
const ArticlePage = lazy(() => import('./components/articlePage/ArticlePage'));
const SearchPage = lazy(() => import('./components/searchPage/SearchPage'));
const LoginPage = lazy(() => import('./components/loginPage/LoginPage'));
const SignupPage = lazy(() => import('./components/signupPage/SingupPage'));
const Dashbaord = lazy(() =>
  import('./components/personalPage/dashboard/Dashboard')
);
const Title = lazy(() => import('./components/personalPage/Title'));
const MyShareList = lazy(() =>
  import('./components/personalPage/myShareList/MyShareList')
);
const Badges = lazy(() => import('./components/personalPage/Badges'));
const MyReceivedList = lazy(() =>
  import('./components/personalPage/myReceivedList/MyReceivedList')
);
const MyToReceiveList = lazy(() =>
  import('./components/personalPage/myToReceiveList/MyToReceiveList')
);
const MyCollectedList = lazy(() =>
  import('./components/personalPage/myCollectedList/MyCollectedList')
);
const CollectedRestaurants = lazy(() =>
  import('./components/personalPage/CollectedRestaurants')
);
const MemberUpdate = lazy(() =>
  import('./components/personalPage/memberUpdatePage/MemberUpdate')
);
const QRcodeComfirmPage = lazy(() =>
  import('./components/qrcodeConfirmPage/QRcodeConfirmPage')
);
const MyMgmtList = lazy(() =>
  import('./components/personalPage/myMgmtPage/MyMgmtList')
);
const Notification = lazy(() =>
  import('./components/personalPage/myNotification/Notification')
);
const ErrorPage = lazy(() => import('./components/ErrorPage'));

const App = () => {
  const { isLoaded, isLoggedIn } = useCheckUser();

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <PaddingLoading>
            <Loading />
          </PaddingLoading>
        }
      >
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
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
