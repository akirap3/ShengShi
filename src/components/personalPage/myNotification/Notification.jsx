import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { getAllContents } from '../../../utils/firebase';
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

  return currentUser && messages ? (
    messages.length !== 0 ? (
      <NotificationContainer>
        {messages.map((message) => (
          <NotificationCard
            key={uuidv4()}
            message={message}
            currentUser={currentUser}
          />
        ))}
      </NotificationContainer>
    ) : (
      <NoResultContainer>
        <NoResult>你目前沒有任何的訊息</NoResult>
      </NoResultContainer>
    )
  ) : (
    <NoResultContainer>
      <NoResult>你目前沒有任何的訊息</NoResult>
    </NoResultContainer>
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
