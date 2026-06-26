import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  Context,
  ShareImg,
  InfoContainer,
  Text,
  RequesterName,
  Address,
  ButtonContainer,
  ConfirmedBtn,
  CancleBtn,
} from '../../../common/mgmtCard/MgmtCardUnits';
import {
  getListenedSingleContent,
  updateAfterExchanged,
  cancelShare,
  handleAddBadge,
} from '../../../../utils/firebase';
import { useTranslation } from '../../../../context/LanguageContext';

const QRCode = require('qrcode.react');

const MyMgmtCard = ({ share, requesterId, setAlertMessage, openInfo }) => {
  const [requester, setRequester] = useState();
  const currentUser = useSelector((state) => state.currentUser);
  const { t } = useTranslation();

  useEffect(() => {
    return getListenedSingleContent('users', requesterId, setRequester);
  }, [requesterId]);

  const handleCancelShare = () => {
    cancelShare(share.id, requesterId, share, currentUser).then(() => {
      setAlertMessage(t('cancelSuccess'));
      openInfo();
    });
  };

  const handleConfirmShare = () => {
    updateAfterExchanged(share.id, requesterId, share, currentUser).then(() => {
      handleAddBadge(currentUser.uid);
      handleAddBadge(requesterId);
      setAlertMessage(t('confirmPickupSuccess'));
      openInfo();
    });
  };

  return (
    <>
      {requester && (
        <Context>
          <ShareImg src={share.imageUrl} alt="reduntant-food" />
          <InfoContainer>
            <QRcodeOne>
              <EmbedQrcode
                info={`${share.id}/${requesterId}`}
                size={60}
                width={10}
                height={10}
              />
            </QRcodeOne>
            <QRcodeThree>
              <EmbedQrcode
                info={`${share.id}/${requesterId}`}
                size={40}
                width={5}
                height={5}
              />
            </QRcodeThree>
            <RequesterName>{t('recipient')}：{requester.displayName}</RequesterName>
            <Text>{t('phone')}：{requester.phone || t('notProvided')}</Text>
            <Text>{t('emailLabel')}：{requester.email}</Text>
            <Text>
              {t('pickupQuantity')}： {share.toReceiveInfo[requesterId].quantities}
            </Text>
            <Text>
              {t('dateAndTime')}：
              {share.toReceiveInfo[requesterId].upcomingTimestamp
                .toDate()
                .toLocaleString()}
            </Text>
            <Address>{t('exchangePlace')}：{share.exchangePlace}</Address>
            <ButtonContainer>
              <ConfirmedBtn onClick={handleConfirmShare}>{t('confirmPickup')}</ConfirmedBtn>
              <CancleBtn onClick={handleCancelShare}>{t('cancel')}</CancleBtn>
            </ButtonContainer>
          </InfoContainer>
        </Context>
      )}
    </>
  );
};

const QRcodeBasic = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
`;

const QRcodeOne = styled(QRcodeBasic)`
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const QRcodeThree = styled(QRcodeBasic)`
  @media screen and (min-width: 900px) {
    display: none;
  }
`;

const EmbedQrcode = ({ info, size, height, width }) => {
  const value = `https://shengshi.itcosmos.co/personal/${info}`;
  const src =
    'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Flogo%2Fshengshi-logo2.svg?alt=media&token=218bb2b8-ebaf-4f8d-809a-50912c6d2a6a';

  const initialProps = {
    value,
    size,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
    includeMargin: false,
    renderAs: 'svg',
    imageSettings: {
      src,
      x: null,
      y: null,
      height,
      width,
      excavate: true,
    },
  };

  return <QRCode {...initialProps} />;
};

export default MyMgmtCard;
