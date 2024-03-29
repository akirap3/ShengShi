import { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import useCurrentUser from '../../hooks/useCurrentUser';
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
      openAlertWithMessage('您非此剩食的擁有者或是領用者');
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
      {share !== undefined && requester !== undefined ? (
        share && currentUser ? (
          !isOthers(share, currentUser) ? (
            !isReceived(share) ? (
              !isCancled(share) ? (
                <>
                  <Title title="勝食領取管理"></Title>
                  <MgmtContainer>
                    <Context>
                      <ShareImg
                        src={share?.imageUrl || defaultImgUrl}
                        alt="redundant-food"
                      />
                      <InfoContainer>
                        <RequesterName>
                          {isGiver(share, currentUser)
                            ? `領取者：${requester?.displayName}`
                            : isRequester(share, currentUser)
                            ? `提供者：${giver?.displayName}`
                            : ''}
                        </RequesterName>
                        <Text>
                          {`電話：`}
                          {isGiver(share, currentUser)
                            ? requester?.phone || '未提供'
                            : isRequester(share, currentUser)
                            ? giver?.phone || '未提供'
                            : ''}
                        </Text>
                        <Text>
                          {`電子郵件：`}
                          {isGiver(share, currentUser)
                            ? requester?.email || '未提供'
                            : isRequester(share, currentUser)
                            ? giver?.email || '未提供'
                            : ''}
                        </Text>
                        <Text>
                          領取數量：
                          {share?.toReceiveInfo[`${requesterId}`]?.quantities}
                        </Text>
                        <Text>
                          日期時間：
                          {share?.toReceiveInfo[requesterId]?.upcomingTimestamp
                            ?.toDate()
                            .toLocaleString()}
                        </Text>
                        <Address>交換地點：{share?.exchangePlace}</Address>
                        {isGiver(share, currentUser) && (
                          <ButtonContainer>
                            <ConfirmedBtn onClick={handleConfirmShare}>
                              確認領取
                            </ConfirmedBtn>
                            <CancleBtn onClick={handleCancelShare}>
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
