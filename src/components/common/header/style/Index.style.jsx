import styled from 'styled-components';
import { BsPersonCircle } from 'react-icons/bs';
import { FcMenu } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 70px;
  padding: 0.5rem 2vw;
  font-family: 'cwTeXYen', sans-serif;
  color: #2d6a4f;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 1500px) {
    padding: 0 15vw;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 45px;
  margin-right: 1rem;
  @media screen and (min-width: 1500px) {
    height: 60px;
    margin-right: 2rem;
  }
`;

const StyledLink = styled(Link)`
  width: 35px;
  cursor: pointer;
  @media screen and (min-width: 650px) {
    font-size: 24px;
  }
  @media screen and (min-width: 1540px) {
    font-size: 32px;
  }

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 5px;
    top: 130%;
    left: 0;
    background: #95d5b2;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 1s;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Tag = styled.div`
  position: relative;
  margin-right: 1rem;

  @media screen and (min-width: 1700px) {
    margin-right: 3rem;
  }

  @media screen and (min-width: 1500px) {
    margin-right: 2rem;
  }
`;

const RestaurantTag = styled(Tag)`
  @media screen and (max-width: 800px) {
    margin-right: auto;
  }
`;

const RestaurantNav = styled(StyledLink)`
  width: 70px;
`;

const ArticleTag = styled(Tag)`
  margin-right: auto;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const MemberIconContainer = styled.div`
  position: relative;
`;

const MemberLoggedIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 1rem;
  border-radius: 50%;
  border: 1px solid skyblue;
  object-fit: cover;
`;

const MessageCount = styled.div`
  position: absolute;
  padding: 5px 8px;
  bottom: 0px;
  right: 10px;
  background: #2196f3;
  border-radius: 50%;
  font-size: 12px;
  color: white;
  opacity: 0.8;
`;

const MemberIcon = styled(BsPersonCircle)`
  height: 30px;
  width: 30px;
  margin-right: 1rem;
  fill: #b7b7a4;
  @media screen and (min-width: 1500) {
    width: 50px;
    height: 50px;
    margin-right: 3rem;
  }
`;

const MyDashboard = styled(StyledLink)`
  width: 70px;
`;

const MobileHeader = styled.div`
  display: none;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 70px;
  padding: 0.5rem 20px;
  background-color: white;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 700px) {
    display: flex;
  }
`;

const MobileLogoLink = styled(Link)`
  margin-right: auto;
`;

const MobileHeaderLogo = styled.img`
  height: 45px;
`;

const MobileMenuIcon = styled(FcMenu)`
  height: 25px;
  width: 25px;
  margin-left: 1vw;
  cursor: pointer;
`;

export {
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
};
