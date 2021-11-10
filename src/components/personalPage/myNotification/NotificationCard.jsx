import React from 'react';
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
      <MessageTag>
        {`# `}
        {message.kind}
      </MessageTag>
      <MessageContent>{message.messageContent}</MessageContent>
      <StyledColse onClick={handleDeleteMessage} />
    </Context>
  );
};

const Context = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  position: relative;
  border: 1px solid black;
  padding: 2vw;
  border-radius: 5px;
  margin-bottom: 2vw;
`;

const MessageIcon = styled(AiFillMessage)`
  width: 5vw;
  height: 5vw;
  margin-right: 2vw;
`;

const MessageTag = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-right: 2vw;
  background-color: lightsteelblue;
`;

const MessageContent = styled.div``;

const StyledColse = styled(AiFillCloseCircle)`
  position: absolute;
  top: -1.2vw;
  right: -1.2vw;
  width: 3vw;
  height: 3vw;
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 4vw;
    height: 4vw;
    top: -2vw;
    right: -2vw;
  }
`;

export default NotificationCard;
