import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../personalPage/Title';

import {
  getListenedSingleContent,
  handleConfirmShare,
  handleCancelShare,
} from '../../utils/firebase';

import {
  MgmtContainer,
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
} from '../common/mgmtCard/MgmtCardUnits';

import AlertPopup from '../common/AlertPopup';
import useCurrentUser from '../../hooks/useCurrentUser';
import NoResult from '../personalPage/NoResult';
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

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const defaultImgUrl =
    'https://react.semantic-ui.com/images/wireframe/image.png';

  const getShare = useCallback(() => {
    getListenedSingleContent('shares', shareId, setShare);
  }, [shareId]);

  const getGiver = useCallback(() => {
    getListenedSingleContent('users', share?.postUser?.id, setGiver);
  }, [share?.postUser?.id]);

  const getRequester = useCallback(() => {
    getListenedSingleContent('users', requesterId, setRequester);
  }, [requesterId]);

  useEffect(() => {
    return getShare();
  }, [getShare]);

  useEffect(() => {
    if (share) return getGiver();
  }, [share, getGiver]);

  useEffect(() => {
    return getRequester();
  }, [getRequester]);

  const isGiver = (share, currentUser) => {
    return share?.postUser?.id === currentUser.uid ? true : false;
  };

  const isRequester = (share, currentUser) => {
    return share?.toReceiveUserId?.includes(currentUser.uid) ? true : false;
  };

  const isOthers = (share, currentUser) => {
    if (
      isGiver(share, currentUser) ||
      isRequester(share, currentUser) ||
      isReceived(share)
    ) {
      return false;
    } else {
      setAlertMessage('您非此剩食的擁有者或是領用者');
      openInfo();
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

  return (
    <>
      {share !== undefined && requester !== undefined ? (
        share && currentUser ? (
          !isOthers(share, currentUser) ? (
            !isReceived(share) ? (
              !isCancled(share) ? (
                <>
                  <Title title="勝食領取管理"></Title>
                  <MgmtContainer>
                    <Context>
                      <ShareImg src={share?.imageUrl || defaultImgUrl} />
                      <InfoContainer>
                        <RequesterName>
                          {isGiver(share, currentUser)
                            ? `領取者：${requester?.displayName}`
                            : isRequester(share, currentUser)
                            ? `提供者：${giver?.displayName}`
                            : ''}
                        </RequesterName>
                        <RequesterPhone>
                          {`電話：`}
                          {isGiver(share, currentUser)
                            ? requester?.phone || '未提供'
                            : isRequester(share, currentUser)
                            ? giver?.phone || '未提供'
                            : ''}
                        </RequesterPhone>
                        <RequesterEmail>
                          {`電子郵件：`}
                          {isGiver(share, currentUser)
                            ? requester?.email || '未提供'
                            : isRequester(share, currentUser)
                            ? giver?.email || '未提供'
                            : ''}
                        </RequesterEmail>
                        <RequesterQty>
                          領取數量：
                          {share?.toReceiveInfo[`${requesterId}`]?.quantities}
                        </RequesterQty>
                        <RequestedDateTime>
                          日期時間：
                          {share?.toReceiveInfo[requesterId]?.upcomingTimestamp
                            ?.toDate()
                            .toLocaleString()}
                        </RequestedDateTime>
                        <Address>交換地點：{share?.exchangePlace}</Address>
                        {isGiver(share, currentUser) && (
                          <ButtonContainer>
                            <ConfirmedBtn
                              onClick={() =>
                                handleConfirmShare(
                                  share.id,
                                  requesterId,
                                  share,
                                  currentUser,
                                  setAlertMessage,
                                  openInfo
                                )
                              }
                            >
                              確認領取
                            </ConfirmedBtn>
                            <CancleBtn
                              onClick={() =>
                                handleCancelShare(
                                  share.id,
                                  requesterId,
                                  share,
                                  currentUser,
                                  setAlertMessage,
                                  openInfo
                                )
                              }
                            >
                              取消
                            </CancleBtn>
                          </ButtonContainer>
                        )}
                      </InfoContainer>
                    </Context>
                  </MgmtContainer>
                </>
              ) : (
                <NoResult text="該領取已經取消" />
              )
            ) : (
              <NoResult text="該領取已經完成" />
            )
          ) : (
            <NoResult text="您非此剩食的擁有者或是領用者" />
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
