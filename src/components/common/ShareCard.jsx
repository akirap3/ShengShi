import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { themeColor } from '../../utils/commonVariables';

import '@reach/dialog/styles.css';
import DeletePopup from './DeletePopup';
import { handleCollection } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

import { ImSpoonKnife } from 'react-icons/im';
import {
  AiTwotoneStar,
  AiTwotoneHeart,
  AiFillCloseCircle,
} from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';

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
  const openDelete = () => setShowDelete(true);
  const closeDelete = () => setShowDelete(false);

  const handleNeedLogin = () => {
    alert('請先登入');
    history.push('/login');
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
          <CardRow>
            <CardItem>
              <ShareNameIcon />
              <ShareUseName>{share?.postUser?.displayName}</ShareUseName>
            </CardItem>
            <CardItem>
              <Star />
              <Rating>{share?.rating}</Rating>
            </CardItem>
            <Heart
              isliked={
                currentUser
                  ? share.postUser.id === currentUser.uid
                    ? 'blue'
                    : share?.savedUserId?.includes(currentUser.uid)
                    ? 'red'
                    : 'black'
                  : 'black'
              }
              onClick={
                currentUser
                  ? share.postUser.id === currentUser.uid
                    ? () => {}
                    : () => handleCollection(share, 'shares', currentUser)
                  : () => {}
              }
            />
          </CardRow>
          <CardRow>
            <CardItem>
              <PlaceIcon />
              <Location>{share?.userLocation}</Location>
            </CardItem>
            {Tag && <Tag>{tagName}</Tag>}
            <GetButton
              onClick={
                currentUser
                  ? isCollected || isSearch
                    ? share.postUser.id === currentUser.uid
                      ? () => {
                          alert('無法領取自己的勝食，可以到 "我的清單" 編輯');
                        }
                      : share.receivedUserId.includes(currentUser.uid)
                      ? () => alert('您已經領取過了')
                      : share.toReceiveUserId.includes(currentUser.uid)
                      ? () => alert('您已經預定領取了')
                      : () => handleClick(share)
                    : () => handleClick()
                  : () => handleNeedLogin()
              }
            >
              {share.receivedUserId.includes(currentUser.uid)
                ? '已領取'
                : share.toReceiveUserId.includes(currentUser.uid)
                ? '已預訂'
                : btnName || '查看'}
            </GetButton>
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
    </>
  );
};

const ShareContext = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
`;

const ShareImg = styled.img`
  max-width: 15vw;
  border-radius: 10px 0 0 10px;
  @media screen and (max-width: 700px) {
    max-width: 30vw;
  }
  @media screen and (max-width: 460px) {
    max-width: 25vw;
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 1.5vw;
  &:nth-child(2) {
    margin-bottom: 1vw;
  }

  @media screen and (max-width: 800px) {
    &:nth-child(3) {
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 700px) {
    font-size: 2.6vw;
    &:nth-child(2) {
      margin-bottom: 1vw;
    }
  }
`;

const CardItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const CardContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw 1.5vw;
  flex-grow: 1;
  @media screen and (max-width: 700px) {
    padding: 3.5vw 3vw;
  }
`;

const ShareTitle = styled.h2`
  font-size: 2vw;
  margin-bottom: 2vw;
  @media screen and (max-width: 700px) {
    font-size: 3vw;
    margin-bottom: 2vw;
  }
  @media screen and (max-width: 460px) {
    font-size: 3.5vw;
    margin-bottom: 3vw;
  }
`;

const ShareNameIcon = styled(ImSpoonKnife)`
  fill: ${themeColor.iconColor};
  margin-right: 1vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    width: 2.6vw;
    height: 2.6vw;
  }
`;

const ShareUseName = styled.span``;

const StyledColse = styled(AiFillCloseCircle)`
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const DeleteButton = styled(StyledColse)`
  position: absolute;
  top: -1.2vw;
  right: -1.2vw;
  width: 3vw;
  height: 3vw;

  @media screen and (max-width: 700px) {
    width: 4vw;
    height: 4vw;
    top: -2vw;
    right: -2vw;
  }
`;

const Star = styled(AiTwotoneStar)`
  fill: orchid;
  margin-right: 1vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    width: 2.6vw;
    height: 2.6vw;
  }
`;

const Rating = styled.span``;

const Heart = styled(AiTwotoneHeart)`
  fill: ${(props) => props.isliked};
  width: 1.8vw;
  height: 1.8vw;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    width: 2.6vw;
    height: 2.6vw;
  }
`;

const PlaceIcon = styled(GrLocation)`
  margin-right: 1vw;
  width: 1.8vw;
  height: 1.8vw;
`;

const Location = styled.span``;

const GetButton = styled.div`
  border: 1px solid ${themeColor.outLineColor};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #2a9d8f;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 860px) {
    padding: 0.3rem 0.5rem;
  }

  @media screen and (max-width: 800px) {
    margin-top: 0.5rem;
  }
`;

export default ShareCard;
