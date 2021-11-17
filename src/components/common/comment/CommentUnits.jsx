import styled from 'styled-components';
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
  line-height: 16px;
  font-size: 14px;
  border-radius: 5px;
  border-color: lightgray;
`;

export const RepalyButton = styled.button`
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  background-color: white;
  color: #1e88e5;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #1e88e5;
  margin: 10px auto 20px auto;
`;

export const CommentSummary = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  margin-bottom: 15px;
  background-color: rgb(46, 180, 204);
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

export const NoComment = () => {
  return (
    <StyledNoComment>
      <NothingMessage>目前沒有任何的留言</NothingMessage>
      <Nothing src={NothingImg} />
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
  font-family: 'cwTeXYen', sans-serif;
  margin-right: 20px;
`;

const Nothing = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;
