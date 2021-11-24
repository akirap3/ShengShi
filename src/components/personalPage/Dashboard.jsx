import { useState, useEffect, useCallback } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import AddSharePopup from './AddSharePopup';
import Background from '../common/Background';
import Ripples from 'react-ripples';

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
      icon: [<StyledIcon as={BsListNested} key={uuidv4()} />],
      name: '清單',
      count: myListCounts || 0,
      path: '/personal/list',
    },
    {
      icon: [<StyledIcon as={IoRibbonSharp} key={uuidv4()} />],
      name: '統計',
      count: myBadgeCounts || 0,
      path: '/personal/badges',
    },
    {
      icon: [<StyledIcon as={FaArchive} key={uuidv4()} />],
      name: '紀錄',
      count: myReceivedCounts || 0,
      path: '/personal/received',
    },
    {
      icon: [<StyledIcon as={MdFastfood} key={uuidv4()} />],
      name: '已訂',
      count: myToReceiveCounts || 0,
      path: '/personal/toReceive',
    },
    {
      icon: [<StyledIcon as={BsFillHeartFill} key={uuidv4()} />],
      name: '收藏',
      count: myCollectedShareCounts || 0,
      path: '/personal/collectedShares',
    },
    {
      icon: [<StyledIcon as={BsShop} key={uuidv4()} />],
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
        <Background circleBgColor={'rgba(183, 228, 199, 0.5)'} />
        <DashboardContext>
          <LeftColumn>
            <AvatarContainer>
              <Avatar src={userData?.imageUrl} />
              <SettingContainer as={Link} to="/personal/memberUpdate/">
                <Setting />
              </SettingContainer>
            </AvatarContainer>
            <NameContext>
              <BoardIcon as={ImSpoonKnife} />
              <Alias>{userData?.alias}</Alias>
            </NameContext>
          </LeftColumn>
          <Details>
            <Row>
              <BoardIcon as={IoMdPerson} />
              <DetailText>{userData?.displayName}</DetailText>
            </Row>
            <Row>
              <BoardIcon as={FaCoins} />
              <DetailText>{`${userData?.myPoints}`}</DetailText>
            </Row>
            <Row>
              <BoardIcon as={HiLocationMarker} />
              <DetailText>{userData?.myPlace || '尚未設定'}</DetailText>
            </Row>
            <Row>
              <BoardIcon as={BsPeopleFill} />
              <MgmtRipple
                color="#fff"
                during={3000}
                active={
                  location.pathname === '/personal/mgmt'
                    ? '#bbdefbaa'
                    : '#e3f2fd01'
                }
              >
                <MgmtButton as={Link} to="/personal/mgmt">
                  管理預訂
                </MgmtButton>
              </MgmtRipple>
            </Row>
          </Details>
          <Grid>
            {menus.map((menu) => (
              <StyledRipples
                key={menu.name}
                color="#fff"
                during={3000}
                active={
                  menu.path === location.pathname ? '#bbdefbaa' : '#e3f2fd01'
                }
              >
                <Button key={menu.name} as={Link} to={`${menu.path}`}>
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
              </StyledRipples>
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
  font-family: 'cwTeXYen', sans-serif;
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
  object-fit: cover;
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
  width: 25px;
  height: 25px;
  padding: 5px;
  fill: white;
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

const BoardIcon = styled.div`
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
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 20px;
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

const DetailText = styled.span`
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const MgmtRipple = styled(Ripples)`
  border-radius: 8px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${({ active }) => active};

  &:hover {
    transform: translateY(-5px);
  }
`;

const MgmtButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  text-align: center;
  font-size: 16px;
  color: rgb(129, 129, 129);
  border-radius: 8px;

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
  flex-grow: 3;
  margin-top: 25px;

  @media screen and (min-width: 700px) {
    margin-top: 0;
  }
`;

const StyledRipples = styled(Ripples)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #2d6a4f;
  background-color: #e3f2fd01;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${({ active }) => active};

  &:hover {
    transform: translateY(-5px);
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #2d6a4f;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? '#bbdefbaa' : '#e3f2fd01')};
`;

const StyledIcon = styled.div`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const IconContainer = styled.div`
  position: relative;
  margin-right: 40px;
`;

const ItemNumber = styled.div`
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
  font-size: 18px;
  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

const BigButton = styled.button`
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
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
