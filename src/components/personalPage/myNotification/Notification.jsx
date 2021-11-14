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
      <Outer>
        <NotificationContainer>
          {messages.map((message) => (
            <NotificationCard
              key={uuidv4()}
              message={message}
              currentUser={currentUser}
            />
          ))}
        </NotificationContainer>
      </Outer>
    ) : (
      <NoResult text="你目前沒有任何的訊息" />
    )
  ) : (
    <NoResult text="你目前沒有任何的訊息" />
  );
};

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 150px;
`;

const NotificationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 300px);

  @media screen and (min-width: 650px) {
    grid-template-columns: repeat(1, 400px);
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(1, 600px);
  }
`;

export default Notification;
