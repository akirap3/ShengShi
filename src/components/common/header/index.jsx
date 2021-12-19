import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from '../search/SearchBar';
import MobileSideMenu from './MobileSideMenu';
import useCurrentUser from '../../../hooks/useCurrentUser';
import {
  logOut,
  getCurrentUserData,
  getCollectionCounts,
} from '../../../utils/firebase';
import {
  HeaderContainer,
  Logo,
  StyledLink,
  Tag,
  RestaurantTag,
  RestaurantNav,
  ArticleTag,
  MemberIconContainer,
  MemberLoggedIcon,
  MessageCount,
  MemberIcon,
  MyDashboard,
  MobileHeader,
  MobileLogoLink,
  MobileHeaderLogo,
  MobileMenuIcon,
} from './style/Index.style';
import LogoImg from '../../../images/common/shengshi-logo.svg';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [messagesCount, setMessagesCount] = useState('');

  const checkUser = useSelector((state) => state.checkUser);
  const currentUser = useCurrentUser();

  const logout = () => {
    logOut().then(() => {
      dispatch({ type: 'currentUser/get', payload: null });
      history.push('/');
    });
  };

  useEffect(() => {
    return getCollectionCounts(
      `users/${currentUser?.uid}/messages`,
      setMessagesCount
    );
  }, [currentUser]);

  useEffect(() => {
    return getCurrentUserData(currentUser, setUserData);
  }, [currentUser]);

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <Logo src={LogoImg} alt="Shenshi-logo" />
        </Link>
        <Tag>
          <StyledLink to="/">首頁</StyledLink>
        </Tag>
        <RestaurantTag>
          <RestaurantNav to="/restaurants">合作餐廳</RestaurantNav>
        </RestaurantTag>
        <ArticleTag>
          <StyledLink to="/articles">文章</StyledLink>
        </ArticleTag>
        <SearchBar />
        {checkUser.isLoggedIn && userData ? (
          <>
            <MemberIconContainer as={Link} to="/personal/notification">
              <MemberLoggedIcon src={userData.imageUrl} alt="member-avatar" />
              {messagesCount !== 0 && (
                <MessageCount>{messagesCount}</MessageCount>
              )}
            </MemberIconContainer>
            <Tag>
              <MyDashboard to="/personal/list">我的看板</MyDashboard>
            </Tag>
            <Tag>
              <StyledLink as={Link} to="/" onClick={() => logout()}>
                登出
              </StyledLink>
            </Tag>
          </>
        ) : (
          <>
            <MemberIcon />
            <Tag>
              <StyledLink to="/login">登入</StyledLink>
            </Tag>
            <Tag>
              <StyledLink to="/signup">註冊</StyledLink>
            </Tag>
          </>
        )}
      </HeaderContainer>

      <MobileHeader>
        <MobileLogoLink to="/">
          <MobileHeaderLogo src={LogoImg} alt="ShengShi-logo" />
        </MobileLogoLink>
        <SearchBar />
        <MobileMenuIcon onClick={() => setShowMenu(!showMenu)} />
      </MobileHeader>
      {showMenu && (
        <MobileSideMenu
          setShowMenu={setShowMenu}
          checkUser={checkUser}
          logout={logout}
        />
      )}
    </>
  );
};

export default Header;
