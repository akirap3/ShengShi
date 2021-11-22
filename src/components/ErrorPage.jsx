import React from 'react';
import styled from 'styled-components';
import Main from './common/Main';
import errerImg from '../images/common/404-image.gif';
import { StartButton } from './common/Banner/CommonBanner';
import { Link } from 'react-router-dom';

const ErrorPage = ({ padding }) => {
  return (
    <StyledMain>
      <ErrorContainer padding={padding}>
        <ErrorMessage>
          <StyledSpan>404</StyledSpan>
          <Message> 找不到網頁</Message>
        </ErrorMessage>
        <ErrorImg src={errerImg} />
        <StyledStartButton as={Link} to="/">
          返回首頁
        </StyledStartButton>
      </ErrorContainer>
    </StyledMain>
  );
};

const StyledMain = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ padding }) => padding};
`;

const ErrorMessage = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  text-align: center;
`;

const StyledSpan = styled.span`
  font-size: 50px;
  margin-right: 10px;
  color: #52b788;
`;

const Message = styled.span`
  font-size: 25px;
`;

const ErrorImg = styled.img``;

const StyledStartButton = styled(StartButton)`
  text-align: center;
  margin-top: 20px;
  margin-right: 0;
`;

export default ErrorPage;
