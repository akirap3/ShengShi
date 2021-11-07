import { useState } from 'react';
import styled from 'styled-components';

import {
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  increment,
  Timestamp,
} from '@firebase/firestore';

const Comment = ({ currentUser, share, comment }) => {
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
    console.log(comment.id);
    await deleteDoc(
      doc(getFirestore(), `shares/${share.id}/comments`, `${comment.id}`)
    );
    await updateDoc(doc(getFirestore(), `shares`, `${share.id}`), {
      commentsCount: increment(-1),
    });
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
`;

const CommentAvatar = styled.img`
  width: 20xp;
  height: 20px;
  border-radius: 50%;
  margin-right: 1vw;
  margin-top: 5px;
`;

const CommentContent = styled.div`
  flex-grow: 1;
  border: 1px solid lightskyblue;
  border-radius: 5px;
  padding: 5px;
`;

const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2vw;
`;

const CommentAuthor = styled.div`
  margin-right: 3vw;
`;

const CommentDateTime = styled.div`
  color: lightgrey;
  font-size: 10px;
`;

const CommentText = styled.input`
  outline: none;
  border: ${(props) => (props.isEdit ? '1px solid lightsteelblue' : 'none')};
`;

const CommentButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1vw 0 2vw 0;
  font-size: 10px;
`;

const EditButton = styled.button`
  color: lightseagreen;
`;

const DeleteButton = styled.button`
  color: orangered;
`;

export default Comment;
