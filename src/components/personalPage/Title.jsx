import React from 'react';
import styled from 'styled-components';

import Hotpot from '../../images/searchPage/hotpot.svg';

const Title = ({ title }) => {
  return (
    <SharesTitleContainer>
      <Outline>
        <TitleIcon src={Hotpot} />
        <SharesTitle>{title}</SharesTitle>
        <Balls />
      </Outline>
    </SharesTitleContainer>
  );
};

const SharesTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2rem auto 0;
`;

const Outline = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #52b788;
  border-radius: 40px;
  padding: 2px 20px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

const TitleIcon = styled.img`
  width: 50px;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
`;

const SharesTitle = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: white;
`;

const Balls = () => {
  return (
    <StyledDiv>
      <div id="ball-content">
        <div id="ball" className="ball1"></div>
        <div id="ball" className="ball2"></div>
        <div id="ball" className="ball3"></div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: relative;
  #ball-content {
    position: absolute;
    transform: scale(1);
    right: -15px;
    top: -20px;
  }
  #ball {
    border-radius: 100%;
    width: 15px;
    height: 15px;
    margin: 10px;
    position: absolute;
    transform: scale(0.8);
  }
  .ball1 {
    background-color: #f1c40f;
    top: 15px;
    left: 22px;
    animation-name: anim-ball1;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .ball2 {
    background-color: #e67e22;
    top: 1px;
    left: 3px;
    animation-name: anim-ball2;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .ball3 {
    background-color: #e74c3c;
    left: 26px;
    top: -8px;
    animation-name: anim-ball3;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes anim-ball1 {
    0% {
      top: 15px;
      left: 22px;
    }
    35% {
      top: -8px;
      left: 26px;
    }
    70% {
      top: 1px;
      left: 3px;
    }
    100% {
      top: 15px;
      left: 22px;
    }
  }
  @keyframes anim-ball2 {
    0% {
      top: 1px;
      left: 3px;
    }
    35% {
      top: 15px;
      left: 22px;
    }
    70% {
      left: 26px;
      top: -8px;
    }
    100% {
      top: 1px;
      left: 3px;
    }
  }
  @keyframes anim-ball3 {
    0% {
      left: 26px;
      top: -8px;
    }
    35% {
      top: 1px;
      left: 3px;
    }
    70% {
      top: 15px;
      left: 22px;
    }
    100% {
      left: 26px;
      top: -8px;
    }
  }
`;

export default Title;
