import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { getAllContents } from '../../../utils/firebase';
import { AiFillMessage, AiFillCloseCircle } from 'react-icons/ai';
import useCurrentUser from '../../../hooks/useCurrentUser';
import NotificationCard from './NotificationCard';

const Notification = () => {
  const currentUser = useCurrentUser();
  const [messages, setMessages] = useState();

  const getMessages = useCallback(() => {
    getAllContents(`users/${currentUser.uid}/messages`, setMessages);
  }, [currentUser.uid]);

  useEffect(() => {
    return getMessages();
  }, [getMessages]);

  console.log(messages);
  return currentUser ? (
    <NotificationContainer>
      {messages ? (
        messages.map((message) => (
          <NotificationCard
            key={uuidv4()}
            message={message}
            currentUser={currentUser}
          />
        ))
      ) : (
        <></>
      )}
    </NotificationContainer>
  ) : (
    <></>
  );
};

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 2vw auto;
`;

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10vw;
`;

const NoResult = styled.div``;

export default Notification;
