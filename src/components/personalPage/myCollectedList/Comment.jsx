import { useState } from 'react';
import styled from 'styled-components';

import {
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
  addDoc,
  collection,
} from '@firebase/firestore';

const Comment = ({ currentUser, share, comment, userData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState('');

  const handleEnter = async (e) => {
    if (e.charCode === 13) {
      await updateDoc(
        doc(getFirestore(), `shares/${share.id}/comments`, `${comment.id}`),
        {
          commentContent: editedComment,
          createdAt: Timestamp.now(),
        }
      );
      setEditedComment('');
      setIsEdit(false);
    }
  };

  const handleDeleteComment = async () => {
    await deleteDoc(
      doc(getFirestore(), `shares/${share.id}/comments`, `${comment.id}`)
    );

    await addDoc(
      collection(getFirestore(), `users/${share.postUser.id}/messages`),
      {
        createdAt: Timestamp.now(),
        messageContent: `${userData.displayName}在您的${share.name}勝食頁面上刪除留言`,
        kind: 'comment',
      }
    );
  };

  return (
    <>
      <CommentContainer>
        <CommentAvatar src={comment.author.imageUrl} />
        <CommentContent>
          <CommentRow>
            <CommentAuthor>{comment.author.displayName}</CommentAuthor>
            <CommentDateTime>
              {comment.createdAt.toDate().toLocaleString()}
            </CommentDateTime>
          </CommentRow>
          <CommentText
            value={isEdit ? editedComment : comment.commentContent}
            onChange={
              isEdit ? (e) => setEditedComment(e.target.value) : () => {}
            }
            onKeyPress={(e) => handleEnter(e)}
            isEdit={isEdit}
          />
        </CommentContent>
      </CommentContainer>
      <CommentButtonRow>
        {currentUser.uid === comment.author.id && (
          <>
            <EditButton onClick={() => setIsEdit(true)}>編輯</EditButton>
            <DeleteButton onClick={handleDeleteComment}>刪除</DeleteButton>
          </>
        )}
      </CommentButtonRow>
    </>
  );
};

const CommentContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const CommentAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const CommentContent = styled.div`
  flex-grow: 1;
  border: 1px solid lightskyblue;
  border-radius: 5px;
  padding: 8px;
`;

const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const CommentAuthor = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  margin-right: 10px;
`;

const CommentDateTime = styled.div`
  color: rgba(129, 129, 129, 0.68);
  font-size: 10px;
`;

const CommentText = styled.input`
  outline: none;
  border: ${(props) => (props.isEdit ? '1px solid #52b78854' : 'none')};
  border-radius: 5px;
  width: 100%;
`;

const CommentButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0 30px 0;
  font-size: 10px;
`;

const EditButton = styled.button`
  color: white;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  border-radius: 5px;
  padding: 3px 6px;
  background-color: #52b788;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  color: #52b788;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  border-radius: 5px;
  padding: 3px 6px;
  border: 1px solid #52b788;
`;

export default Comment;
