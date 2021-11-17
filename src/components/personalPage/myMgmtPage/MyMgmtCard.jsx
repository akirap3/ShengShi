import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  getListenedSingleContent,
  updateAfterExchanged,
  handleDeleteExchange,
  handleDeleteBadge,
  handleAddBadge,
} from '../../../utils/firebase';

const QRCode = require('qrcode.react');

const MyMgmtCard = ({ share, requesterId }) => {
  const [requester, setRequester] = useState();
  const currentUser = useSelector((state) => state.currentUser);
  const getRequester = useCallback(() => {
    getListenedSingleContent('users', requesterId, setRequester);
  }, [requesterId]);

  useEffect(() => {
    return getRequester();
  }, [getRequester]);

  const handleConfirm = (shareId, requesterId, share, currentUser) => {
    updateAfterExchanged(
      shareId,
      requesterId,
      share?.toReceiveInfo[`${requesterId}`].quantities,
      new Date(),
      currentUser
    ).then(() => {
      handleAddBadge(currentUser.uid);
      handleAddBadge(requesterId);
    });
  };

  const handleCancel = (shareId, requesterId, share, currentUser) => {
    handleDeleteExchange(
      shareId,
      requesterId,
      share?.toReceiveInfo[`${requesterId}`].quantities
    ).then(() => {
      handleDeleteBadge(currentUser.uid);
      handleDeleteBadge(requesterId);
    });
  };

  return (
    <>
      {requester && (
        <Context>
          <ShareImg src={share.imageUrl} />
          <InfoContainer>
            <QRcodeOne>
              <EmbedQrcode
                info={`${share.id}/${requesterId}`}
                size={60}
                width={10}
                height={10}
              />
            </QRcodeOne>
            <QRcodeTwo>
              <EmbedQrcode
                info={`${share.id}/${requesterId}`}
                size={50}
                width={10}
                height={10}
              />
            </QRcodeTwo>
            <QRcodeThree>
              <EmbedQrcode
                info={`${share.id}/${requesterId}`}
                size={40}
                width={5}
                height={5}
              />
            </QRcodeThree>
            <QRcodeFour>
              <EmbedQrcode
                info={`${share.id}/${requesterId}`}
                size={25}
                width={5}
                height={5}
              />
            </QRcodeFour>
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
              <ConfirmedBtn
                onClick={() =>
                  handleConfirm(share.id, requesterId, share, currentUser)
                }
              >
                確認領取
              </ConfirmedBtn>
              <CancleBtn
                onClick={() =>
                  handleCancel(share.id, requesterId, share, currentUser)
                }
              >
                取消
              </CancleBtn>
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

  @media screen and (min-width: 550px) {
    top: 10px;
    right: 10px;
  }

  @media screen and (min-width: 700px) {
    top: 20px;
    right: 20px;
  }
`;

const QRcodeOne = styled(QRcodeBasic)`
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const QRcodeTwo = styled(QRcodeBasic)`
  @media screen and (min-width: 850px) {
    display: none;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const QRcodeThree = styled(QRcodeBasic)`
  @media screen and (min-width: 700px) {
    display: none;
  }
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const QRcodeFour = styled(QRcodeBasic)`
  @media screen and (min-width: 400px) {
    display: none;
  }
`;

const EmbedQrcode = ({ info, size, height, width }) => {
  const initialProps = {
    value: `https://shengshi-8bc48.web.app/personal/${info}`,
    size,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
    includeMargin: false,
    renderAs: 'svg',
    imageSettings: {
      src: 'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Flogo%2F5A39D652-C0D9-4689-B443-F410ACC73F15_4_5005_c.jpeg?alt=media&token=f08780e2-f205-44b9-97ca-a30604ed690e',
      x: null,
      y: null,
      height,
      width,
      excavate: true,
    },
  };

  return <QRCode {...initialProps} />;
};

const Context = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 15px;
  border-radius: 0 0 10px 10px;
  border-top: 10px solid #52b788;
  max-width: 1000px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 550px) {
    flex-direction: row;
    border-left: 10px solid #52b788;
    border-top: 0;
    border-radius: 0 10px 10px 0;
  }

  /* @media screen and (max-width: 700px) {
    max-width: 80vw;
    margin: 1.5vw;
  } */
`;
const ShareImg = styled.img`
  width: 100%;

  @media screen and (min-width: 550px) {
    width: 40%;
  }
  /* @media screen and (max-width: 700px) {
    max-width: 30vw;
  }
  @media screen and (max-width: 460px) {
    max-width: 30vw;
  } */
`;
const InfoContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 15px;
  background-color: hsla(146, 40%, 40%, 0.4);
  border-radius: 0 0 10px 10px;

  @media screen and (min-width: 550px) {
    border-radius: 0 10px 10px 0;
  }

  @media screen and (min-width: 850px) {
    padding: 20px;
  }

  /* @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
  @media screen and (max-width: 700px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media screen and (max-width: 460px) {
    font-size: 10px;
    line-height: 14px;
  } */
`;
const Text = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  color: #000000d1;
  line-height: 28px;

  @media screen and (min-width: 450px) {
    font-size: 22px;
  }

  @media screen and (min-width: 550px) {
    font-size: 16px;
    line-height: 20px;
  }

  @media screen and (min-width: 700px) {
    font-size: 18px;
    line-height: 22px;
  }

  @media screen and (min-width: 900px) {
    font-size: 22px;
    line-height: 30px;
  }
`;

const RequesterName = styled(Text)`
  margin-top: 10px;
  @media screen and (min-width: 550px) {
    margin-top: 5px;
  }
`;
const RequesterPhone = styled(Text)``;
const RequesterEmail = styled(Text)``;
const RequesterQty = styled(Text)``;
const RequestedDateTime = styled(Text)``;
const Address = styled(Text)`
  margin-bottom: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1vw;
  justify-content: center;
  margin-bottom: 15px;
  @media screen and (min-width: 550px) {
    margin-bottom: 5px;
  }
`;
const ConfirmedBtn = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: white;
  background-color: #1e88e5;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;
const CancleBtn = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  background-color: white;
  color: #52b788;
  opacity: 0.8;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

export default MyMgmtCard;
