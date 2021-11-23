import React from 'react';
import Map from './LocationMap';
import styled from 'styled-components';

const Mymap = ({ google, defaultCenter, handleAddress, handleLatLng }) => {
  return (
    <Container>
      <Map
        center={defaultCenter}
        google={google}
        height="250px"
        zoom={15}
        handleAddress={handleAddress}
        handleLatLng={handleLatLng}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Mymap;
