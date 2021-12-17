import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples';
import { IoMdPerson } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCoins } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

const DashboardDetails = ({ userData, location }) => {
  return (
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
            location.pathname === '/personal/mgmt' ? '#bbdefbaa' : '#e3f2fd01'
          }
        >
          <MgmtButton as={Link} to="/personal/mgmt">
            管理預訂
          </MgmtButton>
        </MgmtRipple>
      </Row>
    </Details>
  );
};

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

export default DashboardDetails;
