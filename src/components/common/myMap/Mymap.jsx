import React from 'react';
import Map from './LocationMap';
import styled from 'styled-components';

const Mymap = (props) => {
  return (
    <Container>
      <Map
        google={props.google}
        center={props.defaultCenter}
        height="250px"
        zoom={15}
        handleAddress={props.handleAddress}
        handleLatLng={props.handleLatLng}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Mymap;
