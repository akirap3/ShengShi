import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import {
  handleDeleteMember,
  handleArchiveShare,
  handleDeleteToReceive,
  handleDeleteCollected,
  getCurrentUserData,
} from '../../utils/firebase';
import Loading from './Loading';
import useCurrentUser from '../../hooks/useCurrentUser';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { AiFillCloseCircle } from 'react-icons/ai';

const DeletePopup = ({
  showDelete,
  closeDelete,
  category,
  share,
  isToReceive,
  isCollected,
  toDeleteMember,
}) => {
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  return (
    userData && (
      <DialogOverlay
        isOpen={showDelete}
        onDismiss={closeDelete}
        disabled={isLoading}
      >
        <DialogContent
          style={{
            position: 'relative',
            border: 'solid 1px lightBlue',
            borderRadius: '10px',
          }}
          aria-label="delete-popup"
        >
          {isLoading && <Loading />}
          <PopClose onClick={closeDelete} disabled={isLoading} />
          <Title>{`確認刪除此${category}`}</Title>
          <Row>
            <ConfirmBtn
              onClick={
                isToReceive
                  ? () =>
                      handleDeleteToReceive(setIsLoading, share, closeDelete)
                  : isCollected
                  ? () =>
                      handleDeleteCollected(setIsLoading, share, closeDelete)
                  : toDeleteMember
                  ? () => handleDeleteMember()
                  : () =>
                      handleArchiveShare(
                        setIsLoading,
                        share,
                        closeDelete,
                        currentUser,
                        userData
                      )
              }
              disabled={isLoading}
            >
              確認
            </ConfirmBtn>
            <CancleBtn onClick={closeDelete} disabled={isLoading}>
              取消
            </CancleBtn>
          </Row>
        </DialogContent>
      </DialogOverlay>
    )
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

const CancleBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: orangered;
  color: white;
`;

export default DeletePopup;
