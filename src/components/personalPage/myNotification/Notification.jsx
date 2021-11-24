import { useEffect, useCallback, useState } from 'react';
import useCurrentUser from '../../../hooks/useCurrentUser';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Outer from '../../common/Outer';
import NotificationCard from './NotificationCard';
import NoResult from '../NoResult';
import { getAllContents } from '../../../utils/firebase';

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
      <StyledOuter>
        <NotificationContainer>
          {messages.map((message) => (
            <NotificationCard
              key={uuidv4()}
              message={message}
              currentUser={currentUser}
            />
          ))}
        </NotificationContainer>
      </StyledOuter>
    ) : (
      <NoResult text="你目前沒有任何的訊息" />
    )
  ) : (
    <NoResult text="你目前沒有任何的訊息" />
  );
};

const StyledOuter = styled(Outer)`
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
