import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import {
  getListenedSingleContent,
  updateAfterExchanged,
  handleDeleteExchange,
} from '../../utils/firebase';
import { useSelector } from 'react-redux';

const QRcodeComfirmPage = () => {
  const history = useHistory();
  const { shareId, requesterId } = useParams();
  const currentUser = useSelector((state) => state.currentUser);
  const [share, setShare] = useState(null);
  const [giver, setGiver] = useState(null);
  const [requester, setRequester] = useState(null);
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
    if (isGiver(share, currentUser) || isRequester(share, currentUser)) {
      return false;
    } else {
      alert('您非此剩食的擁有者或是領用者');
      history.push('/');
      return true;
    }
  };

  const isReceived = (share) => {
    return share.receivedUserId.includes(requesterId) ? true : false;
  };

  const isCancled = (share) => {
    return share.toReceiveUserId.includes(requesterId) ? false : true;
  };

  const handleConfirm = (shareId, requesterId, share) => {
    updateAfterExchanged(
      shareId,
      requesterId,
      share?.toReceiveInfo[`${requesterId}`].quantities,
      new Date()
    );
  };

  const handleCancel = (shareId, requesterId, share) => {
    handleDeleteExchange(
      shareId,
      requesterId,
      share?.toReceiveInfo[`${requesterId}`].quantities
    );
  };

  return (
    <>
      {share && currentUser ? (
        !isOthers(share, currentUser) ? (
          !isReceived(share) ? (
            !isCancled(share) ? (
              <GiverContainer>
                <GiverContext>
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
                            handleConfirm(shareId, requesterId, share)
                          }
                        >
                          確認領取
                        </ConfirmedBtn>
                        <CancleBtn
                          onClick={() =>
                            handleCancel(shareId, requesterId, share)
                          }
                        >
                          取消
                        </CancleBtn>
                      </ButtonContainer>
                    )}
                  </InfoContainer>
                </GiverContext>
              </GiverContainer>
            ) : (
              <div>該領取已經取消</div>
            )
          ) : (
            <div>已領取完畢</div>
          )
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
};

const GiverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiverContext = styled.div`
  display: flex;
  border: 1px solid black;
  max-width: 70vw;
  margin: 2vw;
  border-radius: 10px;
  @media screen and (max-width: 700px) {
    max-width: 80vw;
    margin: 4vw;
  }
`;
const ShareImg = styled.img`
  width: 30vw;

  border-radius: 10px 0px 0px 10px;
`;
const InfoContainer = styled.div`
  padding: 2vw;
  font-size: 2vw;
  line-height: 3vw;
`;
const RequesterName = styled.div``;
const RequesterPhone = styled.div``;
const RequesterEmail = styled.div``;
const RequesterQty = styled.div``;
const RequestedDateTime = styled.div``;
const Address = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1vw;
  justify-content: center;
`;
const ConfirmedBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: lightseagreen;
  margin-right: 0.5vw;
  color: white;
`;
const CancleBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: orangered;
  color: white;
`;

export default QRcodeComfirmPage;
