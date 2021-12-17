import { useState } from 'react';

import styled from 'styled-components';
import { AiTwotoneStar } from 'react-icons/ai';

import Logo from '../../../images/common/shengshi-logo2.svg';

const InfoView = ({ imageUrl, restaurantName, rating, address }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      <StyledButton onClick={() => setShowInfo(!showInfo)}>
        <StyledImg src={Logo} alt="info" />
      </StyledButton>
      {showInfo && (
        <Info>
          <InfoImg src={imageUrl} alt="info" />
          <InfoRow>
            <InfoName>{restaurantName}</InfoName>
            <Star />
            <InfoRating>{rating}</InfoRating>
          </InfoRow>
          <InfoAddress>{address}</InfoAddress>
        </Info>
      )}
    </>
  );
};

const StyledButton = styled.button`
  background: none;
  border: none;
`;

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  border: 10px solid lightseagreen;
  background-color: lightseagreen;
  border-radius: 50%;
  opacity: 0.8;
`;

const Info = styled.div`
  min-width: 200px;
  position: absolute;
  top: -200px;
  left: -55px;
  z-index: 10;
  padding: 10px;
  font-family: 'cwTeXYen', sans-serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #fff;
  border-radius: 10px;
`;

const InfoImg = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: auto 5px;
`;

const InfoName = styled.span`
  margin-top: 5px;
  margin-right: auto;
  font-size: 16px;
`;

const Star = styled(AiTwotoneStar)`
  fill: orange;
  margin-right: 5px;
`;

const InfoRating = styled.span`
  font-size: 14x;
`;

const InfoAddress = styled.div`
  font-size: 16px;
  margin: 5px 5px;
  color: blueviolet;
`;

export default InfoView;
