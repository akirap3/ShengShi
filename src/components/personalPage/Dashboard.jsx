import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import AddSharePopup from './AddSharePopup';

import MemberImg from '../../images/PersonalPage/user-9.jpg';
import useCurrentUser from '../../hooks/useCurrentUser';
import { getCurrentUserData, getContentCounts } from '../../utils/firebase';

import { ImSpoonKnife } from 'react-icons/im';
import { AiTwotoneStar } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { IoMdPerson } from 'react-icons/io';
import { BsGear } from 'react-icons/bs';

const Dashbaord = () => {
  const [userData, setUserDate] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [myListCounts, setMyListCounts] = useState(0);
  const [myBadgeCounts, setMyBadgeCounts] = useState(0);
  const [myReceivedCounts, setMyReceivedCounts] = useState(0);
  const [myToReceiveCounts, setMyToReceiveCounts] = useState(0);
  const [myCollectedShareCounts, setMyCollectedShareCounts] = useState(0);
  const [myCollectedStoreCounts, setMyCollectedStoreCounts] = useState(0);
  const currentUser = useCurrentUser();

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  const location = useLocation();
  const menus = [
    { name: '我的清單', count: myListCounts || 0, path: '/personal/list' },
    { name: '我的勳章', count: myBadgeCounts || 0, path: '/personal/badges' },
    {
      name: '領取紀錄',
      count: myReceivedCounts || 0,
      path: '/personal/received',
    },
    {
      name: '尚未領取',
      count: myToReceiveCounts || 0,
      path: '/personal/toReceive',
    },
    {
      name: '收藏清單',
      count: myCollectedShareCounts || 0,
      path: '/personal/collectedShares',
    },
    {
      name: '收藏店家',
      count: myCollectedStoreCounts || 0,
      path: '/personal/collectedRestaurants',
    },
  ];

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserDate),
    [currentUser]
  );

  const getMyListCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'postUser.id',
        '==',
        currentUser,
        setMyListCounts
      ),
    [currentUser]
  );

  const getBadgeCounts = useCallback(
    () =>
      getContentCounts(
        'badges',
        'ownedBy',
        'array-contains',
        currentUser,
        setMyBadgeCounts
      ),
    [currentUser]
  );

  const getReceivedCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'receivedUserId',
        'array-contains',
        currentUser,
        setMyReceivedCounts
      ),
    [currentUser]
  );

  const getToReceiveCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'toReceiveUserId',
        'array-contains',
        currentUser,
        setMyToReceiveCounts
      ),
    [currentUser]
  );

  const getCollectedShareCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'savedUserId',
        'array-contains',
        currentUser,
        setMyCollectedShareCounts
      ),
    [currentUser]
  );

  const getCollectedStoreCounts = useCallback(
    () =>
      getContentCounts(
        'restaurants',
        'savedUserId',
        'array-contains',
        currentUser,
        setMyCollectedStoreCounts
      ),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  useEffect(() => {
    return getMyListCounts();
  }, [getMyListCounts]);

  useEffect(() => {
    return getBadgeCounts();
  }, [getBadgeCounts]);

  useEffect(() => {
    return getReceivedCounts();
  }, [getReceivedCounts]);

  useEffect(() => {
    return getToReceiveCounts();
  }, [getToReceiveCounts]);

  useEffect(() => {
    return getCollectedShareCounts();
  }, [getCollectedShareCounts]);

  useEffect(() => {
    return getCollectedStoreCounts();
  }, [getCollectedStoreCounts]);

  return (
    <>
      <DashboardContainer>
        <DashboardContext>
          <LeftColumn>
            <Avatar src={userData?.imageUrl} />
            <NameContext>
              <AliasIcon />
              <Alias>{userData?.alias}</Alias>
            </NameContext>
          </LeftColumn>
          <Details>
            <Row>
              <PersoanlUsernameIcon />
              <UserName>{userData?.displayName}</UserName>
              <Link to="/personal/memberUpdate/">
                <Setting />
              </Link>
            </Row>
            <Row>
              <Star />
              <Rating>{`我的積點： ${userData?.myPoints}`}</Rating>
            </Row>
            <Row>
              <PlaceIcon />
              <Place> 我的地點： {userData?.myPlace || '尚未設定'}</Place>
            </Row>
          </Details>
          <Grid>
            {menus.map((menu) => (
              <Button
                key={menu.name}
                as={Link}
                to={`${menu.path}`}
                active={menu.path === location.pathname}
              >
                <ButtonName>{menu.name}</ButtonName>
                <ItemNumber>{menu.count}</ItemNumber>
              </Button>
            ))}
          </Grid>
          <CheckButton as={Link} to="/search">
            查看他人的分享
          </CheckButton>
          <ShareButton onClick={openEditor}>我要分享勝食</ShareButton>
        </DashboardContext>
      </DashboardContainer>
      <AddSharePopup showEdit={showEdit} closeEditor={closeEditor} />
    </>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  padding: 2rem 4rem;
`;

const DashboardContext = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'leftColumn personDetals personDetals  Grid Grid Grid ' 'leftColumn   personDetals personDetals  Grid Grid Grid  ' 'leftColumn  CheckButton CheckButton   ShareButton ShareButton ShareButton ';
  gap: 1vw;
  border: 1px solid black;
  border-radius: 10px;
  flex-grow: 1;
  padding: 3vw;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'leftColumn personDetals' 'Grid Grid' 'CheckButton CheckButton' 'ShareButton ShareButton';
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: leftColumn;
`;

const Avatar = styled.img`
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  @media screen and (max-width: 600px) {
    max-width: 25vw;
  }
`;

const NameContext = styled.div`
  display: flex;
  margin-top: 1vw;
  @media screen and (max-width: 700px) {
    margin-top: 2vw;
  }
`;

const AliasIcon = styled(ImSpoonKnife)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;

  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
`;

const Alias = styled.span`
  font-size: 1.8vw;
  @media screen and (max-width: 700px) {
    font-size: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    font-size: 3vw;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8vw;
  grid-area: personDetals;
  flex-grow: 1;
  margin-top: 1vw;

  @media screen and (max-width: 700px) {
    font-size: 2.5vw;
  }

  @media screen and (max-width: 600px) {
    font-size: 3vw;
  }
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PersoanlUsernameIcon = styled(IoMdPerson)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
`;

const UserName = styled.span`
  margin-right: 1.5vw;
`;

const Setting = styled(BsGear)`
  width: 1.8vw;
  height: 1.8vw;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    margin-left: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
`;

const Star = styled(AiTwotoneStar)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
`;

const Rating = styled.span``;

const PlaceIcon = styled(GrLocation)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
`;

const Place = styled.span``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-area: Grid;
  gap: 1vw;
  flex-grow: 3;
  font-size: 1.5vw;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2vw;
    font-size: 2.5vw;
  }

  @media screen and (max-width: 600px) {
    font-size: 3vw;
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  padding: 1vw;

  background-color: ${({ active }) => (active ? '#2a9d8f' : 'white')};

  @media screen and (max-width: 700px) {
    flex-direction: row;
    padding: 2vw;
  }
`;

const ButtonName = styled.div`
  @media screen and (max-width: 700px) {
    margin-right: 1vw;
  }
`;

const ItemNumber = styled.div`
  margin-top: 0.8vw;
  background-color: lightblue;
  padding: 5px 8px;
  border-radius: 50%;
  border: 0.5px solid lightseagreen;
  font-weight: 500;
  opacity: 0.8;
  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;

const BigButton = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  padding: 1vw 2vw;
  font-size: 1.5vw;
  text-align: center;
  @media screen and (max-width: 700px) {
    padding: 2vw;
    font-size: 2.5vw;
  }
  @media screen and (max-width: 600px) {
    font-size: 3vw;
  }
`;

const CheckButton = styled(BigButton)`
  grid-area: CheckButton;
`;

const ShareButton = styled(BigButton)`
  grid-area: ShareButton;
  cursor: pointer;
`;

export default Dashbaord;
