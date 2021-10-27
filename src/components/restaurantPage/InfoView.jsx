import { useState } from 'react';
import Logo from '../../images/common/logo-2.png';
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
  width: 10vw;
  padding: 1em;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
  top: -160px;
  left: -35px;
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
  margin-right: auto;
`;

const Star = styled(AiTwotoneStar)`
  fill: orange;
  margin-right: 5px;
`;

const InfoRating = styled.span``;

const InfoAddress = styled.div`
  margin: 5px 5px;
  color: blueviolet;
`;

export default InfoView;
