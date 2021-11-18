import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import AddSharePopup from './AddSharePopup';
import LoginBg2 from '../loginPage/LoginBg2';

import useCurrentUser from '../../hooks/useCurrentUser';
import {
  getCurrentUserData,
  getContentCounts,
  getCountsTwoFiltered,
} from '../../utils/firebase';

import { ImSpoonKnife } from 'react-icons/im';
import { IoMdPerson } from 'react-icons/io';
import { IoRibbonSharp } from 'react-icons/io5';
import {
  BsGear,
  BsListNested,
  BsPeopleFill,
  BsFillHeartFill,
  BsShop,
} from 'react-icons/bs';
import { FaCoins, FaArchive } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { MdFastfood } from 'react-icons/md';

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
    {
      icon: [<ListIcon key={uuidv4()} />],
      name: '清單',
      count: myListCounts || 0,
      path: '/personal/list',
    },
    {
      icon: [<BadgeIcon key={uuidv4()} />],
      name: '統計',
      count: myBadgeCounts || 0,
      path: '/personal/badges',
    },
    {
      icon: [<RecordIcon key={uuidv4()} />],
      name: '紀錄',
      count: myReceivedCounts || 0,
      path: '/personal/received',
    },
    {
      icon: [<BookedIcon key={uuidv4()} />],
      name: '已訂',
      count: myToReceiveCounts || 0,
      path: '/personal/toReceive',
    },
    {
      icon: [<HeartIcon key={uuidv4()} />],
      name: '收藏',
      count: myCollectedShareCounts || 0,
      path: '/personal/collectedShares',
    },
    {
      icon: [<ShopIcon key={uuidv4()} />],
      name: '店家',
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
      getCountsTwoFiltered(
        'shares',
        'postUser.id',
        'isArchived',
        '==',
        '==',
        currentUser,
        false,
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
        <LoginBg2 />
        <DashboardContext>
          <LeftColumn>
            <AvatarContainer>
              <Avatar src={userData?.imageUrl} />
              <SettingContainer as={Link} to="/personal/memberUpdate/">
                <Setting />
              </SettingContainer>
            </AvatarContainer>
            <NameContext>
              <AliasIcon />
              <Alias>{userData?.alias}</Alias>
            </NameContext>
          </LeftColumn>
          <Details>
            <Row>
              <PersoanlUsernameIcon />
              <UserName>{userData?.displayName}</UserName>
            </Row>
            <Row>
              <PointIcon />
              <Rating>{`${userData?.myPoints}`}</Rating>
            </Row>
            <Row>
              <LocationIcon />
              <Place>{userData?.myPlace || '尚未設定'}</Place>
            </Row>
            <Row>
              <MgmtIcon />
              <MgmtButton
                as={Link}
                to="/personal/mgmt"
                active={location.pathname === '/personal/mgmt'}
              >
                管理預訂
              </MgmtButton>
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
                <IconContainer>
                  {menu.icon.map((icon) => icon)}
                  {menu.count !== 0 ? (
                    <ItemNumber>{menu.count}</ItemNumber>
                  ) : (
                    <></>
                  )}
                </IconContainer>

                <ButtonName>{menu.name}</ButtonName>
              </Button>
            ))}
          </Grid>
          <CheckButton as={Link} to="/search">
            勝食搜尋
          </CheckButton>
          <ShareButton onClick={openEditor}>分享勝食 +10</ShareButton>
        </DashboardContext>
      </DashboardContainer>
      <AddSharePopup
        showEdit={showEdit}
        closeEditor={closeEditor}
        currentUser={currentUser}
      />
    </>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  position: relative;
  background-color: rgba(219, 245, 255, 0.3);
  backdrop-filter: blur(5px);
  @media screen and (min-width: 1500px) {
    padding: 5vw 18vw;
  }
`;

const DashboardContext = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'leftColumn personDetals personDetals  Grid Grid Grid ' 'leftColumn   personDetals personDetals  Grid Grid Grid  ' 'leftColumn  CheckButton CheckButton   ShareButton ShareButton ShareButton ';
  gap: 10px;
  border-radius: 10px;
  flex-grow: 1;
  padding: 25px;
  width: fit-content;
  max-width: 1000px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background: rgba(255, 255, 255, 0.5);

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
  background-color: #e3f2fd01;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 8px;
  padding: 10px;

  @media screen and (min-width: 700px) {
    padding: 25px;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 700px) {
    width: 125px;
    height: 125px;
  }
`;

const SettingContainer = styled.div`
  background-color: rgb(183, 228, 199, 0.3);
  border-radius: 50%;
`;

const Setting = styled(BsGear)`
  position: absolute;
  bottom: -5px;
  right: 5px;
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  cursor: pointer;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;

  @media screen and (min-width: 700px) {
    bottom: 5px;
    right: 5px;
  }
`;

const NameContext = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const AliasIcon = styled(ImSpoonKnife)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;

  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
`;

const Alias = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: personDetals;
  flex-grow: 1;
  background-color: #e3f2fd01;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 8px;
  padding: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const PersoanlUsernameIcon = styled(IoMdPerson)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;

  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
`;

const UserName = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const PointIcon = styled(FaCoins)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;

  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
`;

const Rating = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const LocationIcon = styled(HiLocationMarker)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;

  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
`;

const Place = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const MgmtIcon = styled(BsPeopleFill)`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;

  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
`;

const MgmtButton = styled.button`
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 1.5vw;
  text-align: center;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: rgb(129, 129, 129);
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${({ active }) => (active ? '#bbdefbaa' : '#e3f2fd01')};

  &:hover {
    transform: translateY(-5px);
  }

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-area: Grid;
  gap: 10px;
  margin-top: 25px;
  flex-grow: 3;

  @media screen and (min-width: 700px) {
    margin-top: 0;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  color: #2d6a4f;
  background-color: #e3f2fd01;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${({ active }) => (active ? '#bbdefbaa' : '#e3f2fd01')};

  &:hover {
    transform: translateY(-5px);
  }
`;

const ListIcon = styled(BsListNested)`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const BadgeIcon = styled(IoRibbonSharp)`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const RecordIcon = styled(FaArchive)`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const BookedIcon = styled(MdFastfood)`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const HeartIcon = styled(BsFillHeartFill)`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const ShopIcon = styled(BsShop)`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const IconContainer = styled.div`
  position: relative;
  margin-right: 40px;
`;

const ItemNumber = styled.div`
  margin-top: 0.8vw;
  position: absolute;
  bottom: -5px;
  right: -10px;
  padding: 5px 8px;
  border-radius: 50%;
  font-size: 12px;
  color: white;
  background: #1e88e582;
  backdrop-filter: blur(5px);

  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;

const ButtonName = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const BigButton = styled.button`
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  text-align: center;
  color: #2d6a4f;
  background-color: #00b4cc55;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const CheckButton = styled(BigButton)`
  grid-area: CheckButton;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ShareButton = styled(BigButton)`
  grid-area: ShareButton;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

export default Dashbaord;
