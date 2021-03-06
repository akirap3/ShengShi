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
      openAlertWithMessage('??????????????????????????????????????????');
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
      setAlertMessage('??????????????????????????????');
      openInfo();
    });
  };

  const handleConfirmShare = () => {
    updateAfterExchanged(share.id, requesterId, share, currentUser).then(() => {
      handleAddBadge(currentUser.uid);
      handleAddBadge(requesterId);
      setAlertMessage('?????????????????????????????????');
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
                  <Title title="??????????????????"></Title>
                  <MgmtContainer>
                    <Context>
                      <ShareImg
                        src={share?.imageUrl || defaultImgUrl}
                        alt="redundant-food"
                      />
                      <InfoContainer>
                        <RequesterName>
                          {isGiver(share, currentUser)
                            ? `????????????${requester?.displayName}`
                            : isRequester(share, currentUser)
                            ? `????????????${giver?.displayName}`
                            : ''}
                        </RequesterName>
                        <RequesterPhone>
                          {`?????????`}
                          {isGiver(share, currentUser)
                            ? requester?.phone || '?????????'
                            : isRequester(share, currentUser)
                            ? giver?.phone || '?????????'
                            : ''}
                        </RequesterPhone>
                        <RequesterEmail>
                          {`???????????????`}
                          {isGiver(share, currentUser)
                            ? requester?.email || '?????????'
                            : isRequester(share, currentUser)
                            ? giver?.email || '?????????'
                            : ''}
                        </RequesterEmail>
                        <RequesterQty>
                          ???????????????
                          {share?.toReceiveInfo[`${requesterId}`]?.quantities}
                        </RequesterQty>
                        <RequestedDateTime>
                          ???????????????
                          {share?.toReceiveInfo[requesterId]?.upcomingTimestamp
                            ?.toDate()
                            .toLocaleString()}
                        </RequestedDateTime>
                        <Address>???????????????{share?.exchangePlace}</Address>
                        {isGiver(share, currentUser) && (
                          <ButtonContainer>
                            <ConfirmedBtn onClick={handleConfirmShare}>
                              ????????????
                            </ConfirmedBtn>
                            <CancleBtn onClick={handleCancelShare}>
                              ??????
                            </CancleBtn>
                          </ButtonContainer>
                        )}
                      </InfoContainer>
                    </Context>
                  </MgmtContainer>
                </>
              ) : (
                <NoResult text="?????????????????????" />
              )
            ) : (
              <NoResult text="?????????????????????" />
            )
          ) : (
            <NoResult text="??????????????????????????????????????????" />
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
