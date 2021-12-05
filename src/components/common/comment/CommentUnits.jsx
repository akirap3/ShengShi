import styled from 'styled-components';
import Ripples from 'react-ripples';
import NothingImg from '../../../images/common/nothing.gif';

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const ReplyArea = styled.textarea`
  max-width: 100%;
  min-height: 100px;
  max-height: 200px;
  padding: 10px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 5px;
  border-color: lightgray;
`;

export const ReplyRipples = styled(Ripples)`
  margin: 10px auto 20px auto;
  border-radius: 5px;
`;

export const RepalyButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #1e88e5;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  color: #1e88e5;
  background-color: white;
  cursor: pointer;
`;

export const CommentSummary = styled.div`
  width: fit-content;
  margin-bottom: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  color: white;
  background-color: rgb(46, 180, 204);
`;

export const NoComment = () => {
  return (
    <StyledNoComment>
      <NothingMessage>目前沒有任何的留言</NothingMessage>
      <Nothing src={NothingImg} alt="nothing" />
    </StyledNoComment>
  );
};

const StyledNoComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media screen and (min-width: 500px) {
    flex-direction: row;
  }
`;

const NothingMessage = styled.div`
  margin-right: 20px;
  font-family: 'cwTeXYen', sans-serif;
`;

const Nothing = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;
