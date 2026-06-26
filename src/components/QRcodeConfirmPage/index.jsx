import { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import useCurrentUser from '../../hooks/useCurrentUser';
import { useTranslation } from '../../context/LanguageContext';
import {
  getListenedSingleContent,
  updateAfterExchanged,
  cancelShare,
  handleAddBadge,
} from '../../utils/firebase';
import {
  MgmtContainer,
  Context,
  ShareImg,
  InfoContainer,
  Text,
  RequesterName,
  Address,
  ButtonContainer,
  ConfirmedBtn,
  CancleBtn,
} from '../common/mgmtCard/MgmtCardUnits';
import Title from '../common/Title';
import AlertPopup from '../common/popup/AlertPopup';
import NoResult from '../common/NoResult';
import ErrorPage from '../ErrorPage';
import Loading from '../common/Loading';

const QRcodeComfirmPage = () => {
  const history = useHistory();
  const { shareId, requesterId } = useParams();
  const currentUser = useCurrentUser();
  const [share, setShare] = useState(null);
  const [giver, setGiver] = useState(null);
  const [requester, setRequester] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { t } = useTranslation();

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const defaultImgUrl =
    'https://react.semantic-ui.com/images/wireframe/image.png';

  useEffect(() => {
    return getListenedSingleContent('shares', shareId, setShare);
  }, [shareId]);

  useEffect(() => {
    if (share)
      return getListenedSingleContent('users', share?.postUser?.id, setGiver);
  }, [share]);

  useEffect(() => {
    return getListenedSingleContent('users', requesterId, setRequester);
  }, [requesterId]);

  const isGiver = (share, currentUser) => {
    return share?.postUser?.id === currentUser.uid ? true : false;
  };

  const isRequester = (share, currentUser) => {
    return share?.toReceiveUserId?.includes(currentUser.uid) ? true : false;
  };

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
  };

  const isOthers = (share, currentUser) => {
    if (
      isGiver(share, currentUser) ||
      isRequester(share, currentUser) ||
      isReceived(share)
    ) {
      return false;
    } else {
      openAlertWithMessage(t('errNotOwnerOrRecipient'));
      history.push('/');
      return true;
    }
  };

  const isReceived = (share) => {
    return share?.receivedUserId.includes(requesterId) ? true : false;
  };

  const isCancled = (share) => {
    return share?.toReceiveUserId.includes(requesterId) ? false : true;
  };

  const handleCancelShare = () => {
    cancelShare(share.id, requesterId, share, currentUser).then(() => {
      setAlertMessage(t('confirmCancelSuccess'));
      openInfo();
    });
  };

  const handleConfirmShare = () => {
    updateAfterExchanged(share.id, requesterId, share, currentUser).then(() => {
      handleAddBadge(currentUser.uid);
      handleAddBadge(requesterId);
      setAlertMessage(t('confirmReceiveSuccess'));
      openInfo();
    });
  };

  return (
    <>
      {share !== undefined && requester !== undefined ? (
        share && currentUser ? (
          !isOthers(share, currentUser) ? (
            !isReceived(share) ? (
              !isCancled(share) ? (
                <>
                  <Title title={t('titleQRcodeConfirm')}></Title>
                  <MgmtContainer>
                    <Context>
                      <ShareImg
                        src={share?.imageUrl || defaultImgUrl}
                        alt="redundant-food"
                      />
                      <InfoContainer>
                        <RequesterName>
                          {isGiver(share, currentUser)
                            ? `${t('recipient')}: ${requester?.displayName}`
                            : isRequester(share, currentUser)
                            ? `${t('giver')}: ${giver?.displayName}`
                            : ''}
                        </RequesterName>
                        <Text>
                          {t('phone')}:{' '}
                          {isGiver(share, currentUser)
                            ? requester?.phone || t('notProvided')
                            : isRequester(share, currentUser)
                            ? giver?.phone || t('notProvided')
                            : ''}
                        </Text>
                        <Text>
                          {t('emailLabel')}:{' '}
                          {isGiver(share, currentUser)
                            ? requester?.email || t('notProvided')
                            : isRequester(share, currentUser)
                            ? giver?.email || t('notProvided')
                            : ''}
                        </Text>
                        <Text>
                          {t('pickupQuantity')}:{' '}
                          {share?.toReceiveInfo[`${requesterId}`]?.quantities}
                        </Text>
                        <Text>
                          {t('dateAndTime')}:{' '}
                          {share?.toReceiveInfo[requesterId]?.upcomingTimestamp
                            ?.toDate()
                            .toLocaleString()}
                        </Text>
                        <Address>{t('exchangePlace')}: {share?.exchangePlace}</Address>
                        {isGiver(share, currentUser) && (
                          <ButtonContainer>
                            <ConfirmedBtn onClick={handleConfirmShare}>
                              {t('confirmPickup')}
                            </ConfirmedBtn>
                            <CancleBtn onClick={handleCancelShare}>
                              {t('cancel')}
                            </CancleBtn>
                          </ButtonContainer>
                        )}
                      </InfoContainer>
                    </Context>
                  </MgmtContainer>
                </>
              ) : (
                <NoResult text={t('bookingCancelled')} />
              )
            ) : (
              <NoResult text={t('bookingCompleted')} />
            )
          ) : (
            <NoResult text={t('errNotOwnerOrRecipient')} />
          )
        ) : (
          <Loading />
        )
      ) : (
        <ErrorPage />
      )}
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

export default QRcodeComfirmPage;
