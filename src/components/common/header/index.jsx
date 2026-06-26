import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from '../search/SearchBar';
import MobileSideMenu from './MobileSideMenu';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useTranslation } from '../../../context/LanguageContext';
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
  ToggleContainer,
  ToggleThumb,
  ToggleText,
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
  const { t, locale, toggleLanguage } = useTranslation();

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
          <StyledLink to="/">{t('home')}</StyledLink>
        </Tag>
        <RestaurantTag>
          <RestaurantNav to="/restaurants">{t('partners')}</RestaurantNav>
        </RestaurantTag>
        <ArticleTag>
          <StyledLink to="/articles">{t('articles')}</StyledLink>
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
              <MyDashboard to="/personal/list">{t('myDashboard')}</MyDashboard>
            </Tag>
            <Tag>
              <StyledLink as={Link} to="/" onClick={() => logout()}>
                {t('logout')}
              </StyledLink>
            </Tag>
          </>
        ) : (
          <>
            <MemberIcon />
            <Tag>
              <StyledLink to="/login">{t('login')}</StyledLink>
            </Tag>
            <Tag>
              <StyledLink to="/signup">{t('signup')}</StyledLink>
            </Tag>
          </>
        )}
        <ToggleContainer onClick={toggleLanguage}>
          <ToggleThumb locale={locale} />
          <ToggleText active={locale === 'en'}>EN</ToggleText>
          <ToggleText active={locale === 'zh'}>中</ToggleText>
        </ToggleContainer>
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
