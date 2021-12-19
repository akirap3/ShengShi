import styled from 'styled-components';
import Ripples from 'react-ripples';
import { ImSpoonKnife } from 'react-icons/im';
import { AiTwotoneHeart, AiFillCloseCircle } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';

const ShareContext = styled.div`
  display: flex;
  max-width: 550px;
  border: 0;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 0 10px 10px 0;
  border-left: 10px solid #52b788;
`;

const ShareImg = styled.img`
  width: 100px;
  object-fit: cover;

  @media screen and (min-width: 500px) {
    width: 125px;
  }

  @media screen and (min-width: 850px) {
    width: 150px;
  }

  @media screen and (min-width: 1500px) {
    width: 200px;
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;

const CardRowOne = styled(CardRow)`
  margin-bottom: 10px;
`;

const CardItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  padding: 10px;
  position: relative;
  background-color: #b7e4c7;
  border-radius: 0 10px 10px 0;

  @media screen and (min-width: 500px) {
    padding: 15px;
  }

  @media screen and (min-width: 900px) {
    padding: 20px;
  }
`;

const ShareTitle = styled.div`
  margin-bottom: 15px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 20px;
  font-weight: 500;
`;

const ShareNameIcon = styled(ImSpoonKnife)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  fill: white;
`;

const ShareUseName = styled.span`
  margin-right: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 400px) {
    margin-right: 20px;
  }
`;

const StyledColse = styled(AiFillCloseCircle)`
  border-radius: 50%;
  opacity: 0.8;
  fill: #1e88e582;
  cursor: pointer;
`;

const DeleteButton = styled(StyledColse)`
  width: 22px;
  height: 22px;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const Star = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

const Rating = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  margin-right: 10px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 400px) {
    margin-right: 20px;
  }
`;

const HeartRipples = styled(Ripples)`
  padding: 10px;
  border-radius: 50%;
`;

const WhiteHeart = styled(AiTwotoneHeart)`
  width: 25px;
  height: 25px;
  fill: white;
`;

const Heart = styled(AiTwotoneHeart)`
  width: 25px;
  height: 25px;
  fill: ${({ isliked }) => isliked};
  ${({ isloggedin, isliked }) => {
    if (isloggedin === 'true' && isliked !== '#2196f3aa')
      return `cursor: pointer;`;
  }}
`;

const PlaceIcon = styled(HiLocationMarker)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  padding: 5px;
  border-radius: 50%;
  background-color: rgb(129, 129, 129);
  fill: white;
`;

const Location = styled.span`
  margin-right: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 400px) {
    margin-right: 20px;
  }
`;

const GetBtnRipples = styled(Ripples)`
  margin-left: 5px;
  border-radius: 8px;
`;

const GetButton = styled.div`
  padding: 5px 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  border-radius: 8px;
  background-color: #2a9d8f;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  color: white;
  cursor: pointer;
`;

export {
  ShareContext,
  ShareImg,
  CardRow,
  CardRowOne,
  CardItem,
  CardContent,
  ShareTitle,
  ShareNameIcon,
  ShareUseName,
  DeleteButton,
  Star,
  Rating,
  HeartRipples,
  WhiteHeart,
  Heart,
  PlaceIcon,
  Location,
  GetBtnRipples,
  GetButton,
};
