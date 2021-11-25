import { useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import useCurrentUser from '../../../hooks/useCurrentUser';
import DashboardLeftColumn from './DashboardLeftColumn';
import DashboardDetails from './DashboardDetails';
import DashbaordMenus from './DashboardMenus';
import AddSharePopup from '../AddSharePopup';
import Background from '../../common/Background';
import { getCurrentUserData } from '../../../utils/firebase';

const Dashboard = () => {
  const [userData, setUserDate] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const currentUser = useCurrentUser();
  const location = useLocation();

  const openEditor = () => setShowEdit(true);
  const closeEditor = () => setShowEdit(false);

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserDate),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  return (
    <>
      <DashboardContainer>
        <Background circleBgColor={'rgba(183, 228, 199, 0.5)'} />
        <DashboardContext>
          <DashboardLeftColumn userData={userData} />
          <DashboardDetails userData={userData} location={location} />
          <Grid>
            <DashbaordMenus location={location} />
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

export default Dashboard;
