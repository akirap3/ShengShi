import React from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { AiFillCloseCircle } from 'react-icons/ai';

const DeletePopup = ({ showDelete, closeDelete, category }) => {
  return (
    <DialogOverlay isOpen={showDelete} onDismiss={closeDelete}>
      <DialogContent
        style={{
          position: 'relative',
          border: 'solid 1px lightBlue',
          borderRadius: '10px',
        }}
      >
        <PopClose onClick={closeDelete} />
        <Title>{`確認刪除此${category}`}</Title>
        <Row>
          <ConfirmBtn>確認</ConfirmBtn>
          <CancelBtn onClick={closeDelete}>取消</CancelBtn>
        </Row>
      </DialogContent>
    </DialogOverlay>
  );
};

const PopClose = styled(AiFillCloseCircle)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 3vw;
  height: 3vw;
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 2.2vw;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3vw;
`;

const ConfirmBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: lightseagreen;
  margin-right: 0.5vw;
  color: white;
`;

const CancelBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: orangered;
  color: white;
`;

export default DeletePopup;
