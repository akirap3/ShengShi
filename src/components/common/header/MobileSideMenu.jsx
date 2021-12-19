import React from 'react';
import { Link } from 'react-router-dom';

import {
  MobileMenu,
  MenuClose,
  ImgContainer,
  MobileLogo,
  MobileMenuContent,
  StyledMobileLink,
  MobileShareNav,
  MobileLogoutButton,
} from './style/MobileSideMenu.style';
import LogoImg2 from '../../../images/common/shengshi-logo2.svg';

const MobileSideMenu = ({ setShowMenu, checkUser, logout }) => {
  return (
    <MobileMenu>
      <MenuClose onClick={() => setShowMenu(false)} />
      <ImgContainer as={Link} to="/" onClick={() => setShowMenu(false)}>
        <MobileLogo src={LogoImg2} alt="ShengShi-logo" />
      </ImgContainer>
      <MobileMenuContent>
        <StyledMobileLink as={Link} to="/" onClick={() => setShowMenu(false)}>
          首頁
        </StyledMobileLink>
        <StyledMobileLink
          as={Link}
          to="/restaurants"
          onClick={() => setShowMenu(false)}
        >
          合作餐廳
        </StyledMobileLink>
        <StyledMobileLink
          as={Link}
          to="/articles"
          onClick={() => setShowMenu(false)}
        >
          文章
        </StyledMobileLink>
        <MobileShareNav
          as={Link}
          to="/search"
          onClick={() => setShowMenu(false)}
        >
          他人分享
        </MobileShareNav>
        {checkUser.isLoggedIn ? (
          <>
            <StyledMobileLink
              as={Link}
              to="/personal/list"
              onClick={() => setShowMenu(false)}
            >
              我的看板
            </StyledMobileLink>
            <MobileLogoutButton
              onClick={() => {
                setShowMenu(false);
                logout();
              }}
            >
              登出
            </MobileLogoutButton>
          </>
        ) : (
          <>
            <StyledMobileLink
              as={Link}
              to="/login"
              onClick={() => setShowMenu(false)}
            >
              登入
            </StyledMobileLink>
            <StyledMobileLink
              as={Link}
              to="/signup"
              onClick={() => setShowMenu(false)}
            >
              註冊
            </StyledMobileLink>
          </>
        )}
      </MobileMenuContent>
    </MobileMenu>
  );
};

export default MobileSideMenu;
