import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  Context,
  ShareImg,
  InfoContainer,
  RequesterName,
  RequesterPhone,
  RequesterEmail,
  RequesterQty,
  RequestedDateTime,
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

const QRCode = require('qrcode.react');

const MyMgmtCard = ({ share, requesterId, setAlertMessage, openInfo }) => {
  const [requester, setRequester] = useState();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    return getListenedSingleContent('users', requesterId, setRequester);
  }, [requesterId]);

  const handleCancelShare = () => {
    cancelShare(share.id, requesterId, share, currentUser).then(() => {
      setAlertMessage('您已確認對方取消勝食');
      openInfo();
    });
  };

  const handleConfirmShare = () => {
    updateAfterExchanged(share.id, requesterId, share, currentUser).then(() => {
      handleAddBadge(currentUser.uid);
      handleAddBadge(requesterId);
      setAlertMessage('您已確認對方領取完勝食');
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
            <RequesterName>領取者：{requester.displayName}</RequesterName>
            <RequesterPhone>電話：{requester.phone || '未提供'}</RequesterPhone>
            <RequesterEmail>電子郵件：{requester.email}</RequesterEmail>
            <RequesterQty>
              領取數量： {share.toReceiveInfo[requesterId].quantities}
            </RequesterQty>
            <RequestedDateTime>
              日期時間：
              {share.toReceiveInfo[requesterId].upcomingTimestamp
                .toDate()
                .toLocaleString()}
            </RequestedDateTime>
            <Address>交換地點：{share.exchangePlace}</Address>
            <ButtonContainer>
              <ConfirmedBtn onClick={handleConfirmShare}>確認領取</ConfirmedBtn>
              <CancleBtn onClick={handleCancelShare}>取消</CancleBtn>
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
