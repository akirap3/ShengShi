import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.div`
  position: relative;
  margin: 50px;
  @media screen and (min-width: 1500px) {
    margin: 5vw 15vw;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #a0a0968a;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

const TextRow = styled.div`
  display: flex;

  @media screen and (max-width: 650px) {
    order: 1;
    margin-bottom: 3vw;
  }
`;

const Text = styled(Link)`
  position: relative;
  margin: auto 2rem;
  text-align: center;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: #40916c;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    left: 0;
    bottom: -5px;
    background-color: #3ea9e1;
    transition: 0.6s width linear;
  }

  &:hover {
    &:after {
      width: 100%;
    }
  }

  @media screen and (min-width: 1500px) {
    font-size: 32px;
  }
`;

const LogoImg = styled.img`
  width: 100px;

  @media screen and (max-width: 650px) {
    order: 0;
  }
`;

const LogoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const CompanyText = styled.div`
  text-align: center;
  color: #757575;
  font-size: 12px;
`;

export {
  FooterContainer,
  FooterContent,
  TextRow,
  Text,
  LogoImg,
  LogoRow,
  CompanyText,
};
