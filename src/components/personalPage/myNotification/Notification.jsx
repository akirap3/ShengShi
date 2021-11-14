import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { getAllContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import NotificationCard from './NotificationCard';
import NoResult from '../NoResult';

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
      <NoResult text="你目前沒有任何的訊息" />
    )
  ) : (
    <NoResult text="你目前沒有任何的訊息" />
  );
};

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 2vw auto;
`;

export default Notification;
