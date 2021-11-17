import { useState } from 'react';
import Logo from '../../images/common/shengshi-logo2.svg';
import { AiTwotoneStar } from 'react-icons/ai';
import styled from 'styled-components';

const InfoView = ({ imageUrl, restaurantName, rating, address }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      <StyledButton onClick={() => setShowInfo(!showInfo)}>
        <StyledImg src={Logo} />
      </StyledButton>
      {showInfo && (
        <Info>
          <InfoImg src={imageUrl} />
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
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #fff;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
  top: -200px;
  left: -55px;
`;

const InfoImg = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const InfoRow = styled.div`
  display: flex;
  margin: auto 5px;
  align-items: center;
`;

const InfoName = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  margin-top: 5px;
  margin-right: auto;
`;

const Star = styled(AiTwotoneStar)`
  fill: orange;
  margin-right: 5px;
`;

const InfoRating = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 14x;
`;

const InfoAddress = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  margin: 5px 5px;
  color: blueviolet;
`;

export default InfoView;
