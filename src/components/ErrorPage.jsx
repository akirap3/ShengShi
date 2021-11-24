import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Main from './common/Main';
import { StartButton } from './common/banner/CommonBanner';
import errerImg from '../images/common/404-image.gif';

const ErrorPage = ({ padding }) => {
  return (
    <StyledMain>
      <ErrorContainer padding={padding}>
        <ErrorMessage>
          <StyledSpan>404</StyledSpan>
          <Message> 找不到網頁</Message>
        </ErrorMessage>
        <img src={errerImg} alt="error" />
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
  text-align: center;
  font-family: 'cwTeXYen', sans-serif;
`;

const StyledSpan = styled.span`
  margin-right: 10px;
  font-size: 50px;
  color: #52b788;
`;

const Message = styled.span`
  font-size: 25px;
`;

const StyledStartButton = styled(StartButton)`
  margin-top: 20px;
  margin-right: 0;
  text-align: center;
`;

export default ErrorPage;
