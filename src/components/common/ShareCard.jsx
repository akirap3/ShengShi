import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import DeletePopup from './DeletePopup';
import AlertPopup from './AlertPopup';
import Ripples from 'react-ripples';
import { handleCollection } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

import StarImg from '../../images/common/star.png';
import { ImSpoonKnife } from 'react-icons/im';
import { AiTwotoneHeart, AiFillCloseCircle } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const ShareCard = ({
  btnName,
  Tag,
  isReceived,
  tagName,
  cnannotDel,
  category,
  share,
  isToReceive,
  isCollected,
  isSearch,
  handleClick,
}) => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [showDelete, setShowDelete] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showNeedLogin, setShowNeedLogin] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const checkUser = useSelector((state) => state.checkUser);

  const openDelete = () => setShowDelete(true);
  const closeDelete = () => setShowDelete(false);

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const openNeedLogin = () => setShowNeedLogin(true);
  const closeNeedLogin = () => {
    setShowNeedLogin(false);
    history.push('/login');
  };

  const handleNeedLogin = () => {
    setAlertMessage('請先登入');
    openNeedLogin();
  };

  return (
    <>
      <ShareContext>
        <ShareImg src={share?.imageUrl} />
        <CardContent>
          <ShareTitle>{share?.name}</ShareTitle>
          {cnannotDel || isReceived ? (
            <></>
          ) : (
            <DeleteButton onClick={openDelete} />
          )}
          <CardRowOne>
            <CardItem>
              <ShareNameIcon />
              <ShareUseName>{share?.postUser?.displayName}</ShareUseName>
            </CardItem>
            <CardItem>
              <Star src={StarImg} />
              <Rating>{share?.rating}</Rating>
            </CardItem>

            {!checkUser.isLoggedIn ? (
              <WhiteHeart></WhiteHeart>
            ) : (
              <HeartRipples color="#ff4d6d" during={1000}>
                <Heart
                  isliked={
                    currentUser
                      ? share?.postUser?.id === currentUser.uid
                        ? '#2196f3aa'
                        : share?.savedUserId?.includes(currentUser.uid)
                        ? '#FF3131'
                        : 'white'
                      : 'white'
                  }
                  onClick={
                    currentUser
                      ? share?.postUser?.id === currentUser.uid
                        ? () => {}
                        : () => handleCollection(share, 'shares', currentUser)
                      : () => {}
                  }
                  isloggedin={checkUser.isLoggedIn.toString()}
                />
              </HeartRipples>
            )}
          </CardRowOne>
          <CardRow>
            <CardItem>
              <PlaceIcon />
              <Location>{share?.userLocation}</Location>
            </CardItem>
            {Tag && <Tag>{tagName}</Tag>}
            <GetBtnRipples color="#fff" during={3000}>
              <GetButton
                onClick={
                  currentUser
                    ? isCollected || isSearch
                      ? share.postUser.id === currentUser?.uid
                        ? () => {
                            setAlertMessage(
                              '無法領取自己的勝食，可以到 "清單" 編輯'
                            );
                            openInfo();
                          }
                        : share.receivedUserId.includes(currentUser?.uid)
                        ? () => {
                            setAlertMessage('您已經領取過了');
                            openInfo();
                          }
                        : share.toReceiveUserId.includes(currentUser?.uid)
                        ? () => {
                            setAlertMessage('您已經預定領取了');
                            openInfo();
                          }
                        : () => handleClick(share)
                      : () => handleClick()
                    : () => handleNeedLogin()
                }
              >
                {share.receivedUserId.includes(currentUser?.uid)
                  ? '已領取'
                  : share.toReceiveUserId.includes(currentUser?.uid)
                  ? '已預訂'
                  : btnName || '查看'}
              </GetButton>
            </GetBtnRipples>
          </CardRow>
        </CardContent>
      </ShareContext>

      <DeletePopup
        showDelete={showDelete}
        closeDelete={closeDelete}
        category={category}
        share={share}
        isToReceive={isToReceive}
        isCollected={isCollected}
      />
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
      <AlertPopup
        showInfo={showNeedLogin}
        closeInfo={closeNeedLogin}
        message={alertMessage}
      />
    </>
  );
};

const ShareContext = styled.div`
  display: flex;
  border: 0;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 0 10px 10px 0;
  border-left: 10px solid #52b788;
  max-width: 550px;
`;

const ShareImg = styled.img`
  width: 100px;
  object-fit: cover;

  @media screen and (min-width: 500px) {
    width: 125px;
  }

  @media screen and (min-width: 850px) {
    width: 150px;
  }

  @media screen and (min-width: 1500px) {
    width: 200px;
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;

const CardRowOne = styled(CardRow)`
  margin-bottom: 10px;
`;

const CardItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  flex-grow: 1;
  background-color: #b7e4c7;
  border-radius: 0 10px 10px 0;

  @media screen and (min-width: 500px) {
    padding: 15px;
  }

  @media screen and (min-width: 900px) {
    padding: 20px;
  }
`;

const ShareTitle = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const ShareNameIcon = styled(ImSpoonKnife)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;
`;

const ShareUseName = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);
  margin-right: 10px;

  @media screen and (min-width: 400px) {
    margin-right: 20px;
  }
`;

const StyledColse = styled(AiFillCloseCircle)`
  fill: #1e88e582;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const DeleteButton = styled(StyledColse)`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 22px;
  height: 22px;
`;

const Star = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

const Rating = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);
  margin-right: 10px;

  @media screen and (min-width: 400px) {
    margin-right: 20px;
  }
`;

const HeartRipples = styled(Ripples)`
  border-radius: 50%;
  padding: 10px;
`;

const WhiteHeart = styled(AiTwotoneHeart)`
  fill: white;
  width: 25px;
  height: 25px;
`;

const Heart = styled(AiTwotoneHeart)`
  fill: ${(props) => props.isliked};
  width: 25px;
  height: 25px;
  ${(props) => {
    if (props.isloggedin === 'true' && props.isliked !== '#2196f3aa')
      return `cursor: pointer;`;
  }}
`;

const PlaceIcon = styled(HiLocationMarker)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;
`;

const Location = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);
  margin-right: 10px;

  @media screen and (min-width: 400px) {
    margin-right: 20px;
  }
`;

const GetBtnRipples = styled(Ripples)`
  border-radius: 8px;
  margin-left: 5px;
`;

const GetButton = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);
  padding: 5px 10px;
  border-radius: 8px;
  background-color: #2a9d8f;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  color: white;
  cursor: pointer;
`;

export default ShareCard;
