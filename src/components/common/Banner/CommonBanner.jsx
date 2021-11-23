import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 35vw;
`;

export const BannerTitle = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 56px;
  font-weight: 600;
  color: black;
`;

export const Subtitle = styled.p`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-weight: 100;
  line-height: 2rem;
  color: #0000009e;

  @media screen and (min-width: 375px) {
    max-width: 60vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 20vw;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledLink = styled(Link)`
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

export const StartButton = styled(StyledLink)`
  background-color: #1e88e5;
  color: white;
`;

export const LearnMoreButton = styled(StyledLink)`
  background-color: white;
  color: #52b788;
  opacity: 0.8;
`;
