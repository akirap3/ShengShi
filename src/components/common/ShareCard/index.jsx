import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useCurrentUser from '../../../hooks/useCurrentUser';
import DeletePopup from '../popup/DeletePopup';
import AlertPopup from '../popup/AlertPopup';
import { handleCollection } from '../../../utils/firebase';
import StarImg from '../../../images/common/star.png';
import {
  ShareContext,
  ShareImg,
  CardRow,
  CardRowOne,
  CardItem,
  CardContent,
  ShareTitle,
  ShareNameIcon,
  ShareUseName,
  DeleteButton,
  Star,
  Rating,
  HeartRipples,
  WhiteHeart,
  Heart,
  PlaceIcon,
  Location,
  GetBtnRipples,
  GetButton,
} from './style/Index.style';

const ShareCard = ({
  btnName,
  Tag,
  isReceived,
  tagName,
  cannnotDel,
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

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const handleNeedLogin = () => {
    setAlertMessage('請先登入');
    openNeedLogin();
  };

  const handleLike = () => {
    if (currentUser) {
      if (share?.postUser?.id === currentUser.uid) {
        return '#2196f3aa';
      } else if (share?.savedUserId?.includes(currentUser.uid)) {
        return '#FF3131';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  };

  const handleClickHeart = () => {
    if (currentUser) {
      if (share?.postUser?.id === currentUser.uid) {
        return;
      } else {
        handleCollection(share, 'shares', currentUser);
      }
    } else {
      return;
    }
  };

  const handleGetBtn = () => {
    if (currentUser) {
      if (isCollected || isSearch) {
        if (share.postUser.id === currentUser?.uid) {
          openAlertWithMessage('無法領取自己的勝食，可以到 "清單" 編輯');
        } else if (share.receivedUserId.includes(currentUser?.uid)) {
          openAlertWithMessage('您已經領取過了');
        } else if (share.toReceiveUserId.includes(currentUser?.uid)) {
          openAlertWithMessage('您已經預定領取了');
        } else {
          handleClick(share);
        }
      } else {
        handleClick();
      }
    } else {
      handleNeedLogin();
    }
  };

  return (
    <>
      <ShareContext>
        <ShareImg src={share?.imageUrl} alt="share" />
        <CardContent>
          <ShareTitle>{share?.name}</ShareTitle>
          {cannnotDel || isReceived ? null : (
            <DeleteButton onClick={openDelete} />
          )}
          <CardRowOne>
            <CardItem>
              <ShareNameIcon />
              <ShareUseName>{share?.postUser?.displayName}</ShareUseName>
            </CardItem>
            <CardItem>
              <Star src={StarImg} alt="star" />
              <Rating>{share?.rating}</Rating>
            </CardItem>
            {!checkUser.isLoggedIn ? (
              <WhiteHeart />
            ) : (
              <HeartRipples color="#ff4d6d" during={1000}>
                <Heart
                  isliked={handleLike}
                  onClick={handleClickHeart}
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
              <GetButton onClick={handleGetBtn}>
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

export default ShareCard;
