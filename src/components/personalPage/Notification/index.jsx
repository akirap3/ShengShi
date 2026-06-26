import { useEffect, useState } from 'react';

import styled from 'styled-components';

import useCurrentUser from '../../../hooks/useCurrentUser';
import Outer from '../../common/Outer';
import NotificationCard from './components/NotificationCard';
import NoResult from '../../common/NoResult';
import { getAllContents } from '../../../utils/firebase';
import { useTranslation } from '../../../context/LanguageContext';

const Notification = () => {
  const currentUser = useCurrentUser();
  const [messages, setMessages] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    return getAllContents(`users/${currentUser.uid}/messages`, setMessages);
  }, [currentUser.uid]);

  return currentUser && messages ? (
    messages.length !== 0 ? (
      <StyledOuter>
        <NotificationContainer>
          {messages.map((message) => (
            <NotificationCard
              key={message.id}
              message={message}
              currentUser={currentUser}
            />
          ))}
        </NotificationContainer>
      </StyledOuter>
    ) : (
      <NoResult text={t('noMessages')} />
    )
  ) : (
    <NoResult text={t('noMessages')} />
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
