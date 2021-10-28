import React from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import MyMap from '../../common/myMap/Mymap';

import { AiFillCloseCircle } from 'react-icons/ai';

const MapPopup = ({ showMap, closeMap, handleAddress, handleLatLng }) => {
  return (
    <DialogOverlay isOpen={showMap} onDismiss={closeMap}>
      <DialogContent
        style={{
          position: 'relative',
          border: 'solid 1px lightBlue',
          borderRadius: '10px',
          width: '80vw',
          padding: '0%',
        }}
      >
        <PopClose onClick={closeMap} />
        <MyMap handleAddress={handleAddress} handleLatLng={handleLatLng} />
      </DialogContent>
    </DialogOverlay>
  );
};

const StyledColse = styled(AiFillCloseCircle)`
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const PopClose = styled(StyledColse)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
`;

export default MapPopup;
