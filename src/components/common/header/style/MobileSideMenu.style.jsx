import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 600px;
  padding: 35px 35px 35px 20px;
  position: fixed;
  z-index: 9;
  top: 70px;
  left: 0;
  border-radius: 0px 0px 10px 0px;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  background: rgb(217, 237, 225, 0.6);
  backdrop-filter: blur(6px);
  font-family: 'cwTeXYen', sans-serif;
  color: black;
`;

const MenuClose = styled(GrFormClose)`
  width: 22px;
  height: 22px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #95d5b2;
    border-radius: 3px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 65px;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgb(4, 169, 109, 0.6);
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;
`;

const MobileLogo = styled.img`
  width: 80px;
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 15px;
`;

const StyledMobileLink = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  transition: 1s;

  &:hover {
    padding: 10px;
    background-color: #95d5b2;
    border-radius: 5px;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
    color: #2d6a4f;
  }
`;

const MobileShareNav = styled(StyledMobileLink)`
  margin-bottom: auto;
`;

const MobileLogoutButton = styled(StyledMobileLink)`
  color: rgb(129, 129, 129);

  &:hover {
    color: white;
  }
`;

export {
  MobileMenu,
  MenuClose,
  ImgContainer,
  MobileLogo,
  MobileMenuContent,
  StyledMobileLink,
  MobileShareNav,
  MobileLogoutButton,
};
