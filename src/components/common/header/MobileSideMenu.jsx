import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from '../../../context/LanguageContext';
import {
  MobileMenu,
  MenuClose,
  ImgContainer,
  MobileLogo,
  MobileMenuContent,
  StyledMobileLink,
  MobileShareNav,
  MobileLogoutButton,
  MobileToggleContainer,
  MobileToggleThumb,
  MobileToggleText,
} from './style/MobileSideMenu.style';
import LogoImg2 from '../../../images/common/shengshi-logo2.svg';

const MobileSideMenu = ({ setShowMenu, checkUser, logout }) => {
  const { t, locale, toggleLanguage } = useTranslation();

  return (
    <MobileMenu>
      <MenuClose onClick={() => setShowMenu(false)} />
      <ImgContainer as={Link} to="/" onClick={() => setShowMenu(false)}>
        <MobileLogo src={LogoImg2} alt="ShengShi-logo" />
      </ImgContainer>
      <MobileMenuContent>
        <StyledMobileLink as={Link} to="/" onClick={() => setShowMenu(false)}>
          {t('home')}
        </StyledMobileLink>
        <StyledMobileLink
          as={Link}
          to="/restaurants"
          onClick={() => setShowMenu(false)}
        >
          {t('partners')}
        </StyledMobileLink>
        <StyledMobileLink
          as={Link}
          to="/articles"
          onClick={() => setShowMenu(false)}
        >
          {t('articles')}
        </StyledMobileLink>
        <MobileShareNav
          as={Link}
          to="/search"
          onClick={() => setShowMenu(false)}
        >
          {t('exploreShares')}
        </MobileShareNav>

        {checkUser.isLoggedIn ? (
          <>
            <StyledMobileLink
              as={Link}
              to="/personal/list"
              onClick={() => setShowMenu(false)}
            >
              {t('myDashboard')}
            </StyledMobileLink>
            <MobileLogoutButton
              onClick={() => {
                setShowMenu(false);
                logout();
              }}
            >
              {t('logout')}
            </MobileLogoutButton>
          </>
        ) : (
          <>
            <StyledMobileLink
              as={Link}
              to="/login"
              onClick={() => setShowMenu(false)}
            >
              {t('login')}
            </StyledMobileLink>
            <StyledMobileLink
              as={Link}
              to="/signup"
              onClick={() => setShowMenu(false)}
            >
              {t('signup')}
            </StyledMobileLink>
          </>
        )}

        <MobileToggleContainer onClick={toggleLanguage}>
          <MobileToggleThumb locale={locale} />
          <MobileToggleText active={locale === 'en'}>EN</MobileToggleText>
          <MobileToggleText active={locale === 'zh'}>中</MobileToggleText>
        </MobileToggleContainer>
      </MobileMenuContent>

    </MobileMenu>
  );
};

export default MobileSideMenu;

