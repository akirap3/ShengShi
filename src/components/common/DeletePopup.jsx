import React, { useState } from 'react';
import styled from 'styled-components';

import {
  getFirestore,
  doc,
  deleteDoc,
  deleteField,
  updateDoc,
  arrayRemove,
} from '@firebase/firestore';
import { getStorage, ref, deleteObject } from '@firebase/storage';
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
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser();

  const handleDeleteShare = async () => {
    setIsLoading(true);
    const deleteImgFileRef = ref(getStorage(), `images/shares/${share?.id}`);
    await deleteObject(deleteImgFileRef);
    await deleteDoc(doc(getFirestore(), 'shares', share?.id));
    setIsLoading(false);
    closeDelete();
  };

  const handleDeleteToReceive = async () => {
    setIsLoading(true);
    const docRef = doc(getFirestore(), 'shares', share?.id);
    await updateDoc(docRef, {
      [`toReceiveInfo.${currentUser.uid}`]: deleteField(),
    });
    await updateDoc(docRef, {
      toReceiveUserId: arrayRemove(currentUser.uid),
    });
    setIsLoading(false);
    closeDelete();
  };

  return (
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
      >
        {isLoading && <Loading />}
        <PopClose onClick={closeDelete} disabled={isLoading} />
        <Title>{`確認刪除此${category}`}</Title>
        <Row>
          <ConfirmBtn
            onClick={
              isToReceive
                ? () => handleDeleteToReceive()
                : () => handleDeleteShare()
            }
            disabled={isLoading}
          >
            確認
          </ConfirmBtn>
          <CancelBtn onClick={closeDelete} disabled={isLoading}>
            取消
          </CancelBtn>
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
