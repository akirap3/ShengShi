import styled from 'styled-components';

import {
  BannerContent,
  BannerTitle,
  Subtitle,
} from '../../common/banner/CommonBanner';
import { ResetButton } from '../../common/search/SearchUnits';

const UpperPart = styled.div`
  position: relative;
  padding-bottom: 2rem;
  background: linear-gradient(253deg, #0cc898, #1797d2, #864fe1);
  background-size: 300% 300%;
  animation: Background 25s ease infinite;

  @keyframes Background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 2rem;

  @media screen and (min-width: 1500px) {
    padding: 5vw 15vw;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  @media screen and (max-width: 450px) {
    padding: 5rem 2rem 1rem;
  }
`;

const BannerImg = styled.img`
  max-width: 80vw;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 700px) {
    order: 2;
  }

  @media screen and (min-width: 700px) {
    max-width: 40vw;
  }

  @media screen and (max-width: 450px) {
    display: none;
  }

  @media screen and (min-width: 1500px) {
    max-width: 30vw;
  }
`;

const StyledBannerContent = styled(BannerContent)`
  @media screen and (max-width: 700px) {
    max-width: 80vw;
    margin-bottom: 3rem;
    order: 1;
  }
`;

const StyledBannerTitle = styled(BannerTitle)`
  color: white;
`;

const Styledsubtitle = styled(Subtitle)`
  color: #ffffff9e;
`;

const StyledResetButton = styled(ResetButton)`
  color: white;
`;

const ArticleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 20rem);
  grid-template-rows: auto;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  margin-bottom: 150px;
  font-family: 'cwTeXYen', sans-serif;

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 20rem);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 20rem);
  }
`;

const ArticleCard = styled.div`
  width: 20rem;
  min-height: 20rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: whitesmoke;
`;

const CardImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px 8px 0px 0px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 1rem 2rem 2rem;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  font-size: 18px;
  background: #52b788;
  color: white;
  cursor: pointer;
`;

const CardTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 24px;
  line-height: 28px;
  font-weight: 600;
`;

const CardSubtitle = styled.div`
  font-weight: 300;
  line-height: 20px;
  color: hsl(0, 0%, 51%);
`;

export {
  UpperPart,
  Banner,
  BannerImg,
  StyledBannerContent,
  StyledBannerTitle,
  Styledsubtitle,
  StyledResetButton,
  ArticleContainer,
  ArticleCard,
  CardImg,
  CardContent,
  TagContainer,
  Tag,
  CardTitle,
  CardSubtitle,
};
