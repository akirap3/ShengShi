import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loading, { PaddingLoading } from './components/common/Loading';
import useCheckUser from './hooks/useCheckUser';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/common/Main';

const LandingPage = lazy(() => import('./components/LandingPage'));
const RestaurantPage = lazy(() => import('./components/RestaurantPage'));
const ArticlePage = lazy(() => import('./components/ArticlePage'));
const SearchPage = lazy(() => import('./components/SearchPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SingupPage'));
const Dashbaord = lazy(() => import('./components/personalPage/Dashboard'));
const Title = lazy(() => import('./components/common/Title'));
const MyShareList = lazy(() => import('./components/personalPage/MyShareList'));
const MyChartBadges = lazy(() =>
  import('./components/personalPage/MyChartBadges')
);
const MyReceivedList = lazy(() =>
  import('./components/personalPage/MyReceivedList')
);
const MyToReceiveList = lazy(() =>
  import('./components/personalPage/MyToReceiveList')
);
const MyCollectedList = lazy(() =>
  import('./components/personalPage/MyCollectedList')
);
const MyCollectedRestaurants = lazy(() =>
  import('./components/personalPage/MyCollectedRestaurants')
);
const MemberUpdate = lazy(() =>
  import('./components/personalPage/MemberUpdate')
);
const QRcodeComfirmPage = lazy(() => import('./components/QRcodeConfirmPage'));
const MyMgmtPage = lazy(() => import('./components/personalPage/MyMgmtPage'));
const Notification = lazy(() =>
  import('./components/personalPage/Notification')
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
                      <MyChartBadges />
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
                      <MyCollectedRestaurants />
                    </Route>
                    <Route exact path="/personal/memberUpdate">
                      <Title title="個人資料更新"></Title>
                      <MemberUpdate />
                    </Route>
                    <Route exact path="/personal/mgmt">
                      <Title title="領取列表管理"></Title>
                      <MyMgmtPage />
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
