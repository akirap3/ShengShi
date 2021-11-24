import styled from 'styled-components';
import { AiFillMessage, AiFillCloseCircle } from 'react-icons/ai';
import { handleDeleteDocument } from '../../../utils/firebase';

const NotificationCard = ({ message, currentUser }) => {
  const handleDeleteMessage = () => {
    handleDeleteDocument(currentUser, message.id);
  };
  return (
    <Context>
      <MessageIcon />
      <MessageContainer>
        <MessageTag>
          {`# `}
          {message.kind}
        </MessageTag>
        <MessageContent>{message.messageContent}</MessageContent>
      </MessageContainer>
      <StyledColse onClick={handleDeleteMessage} />
    </Context>
  );
};

const Context = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  margin-bottom: 15px;
  font-family: 'cwTeXYen', sans-serif;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #b7e4c7;
  border-left: 10px solid #52b788;
`;

const MessageIcon = styled(AiFillMessage)`
  fill: #52b788;
  width: 30px;
  height: 30px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const MessageTag = styled.div`
  width: fit-content;
  margin-bottom: 10px;
  padding: 5px 10px;
  font-size: 16px;
  color: white;
  background: #52b788;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 5px;
`;

const MessageContent = styled.div`
  font-size: 18px;
  margin-left: 10px;
`;

const StyledColse = styled(AiFillCloseCircle)`
  width: 22px;
  height: 22px;
  position: absolute;
  top: -10px;
  right: -10px;
  fill: #1e88e582;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

export default NotificationCard;
