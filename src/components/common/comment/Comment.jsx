import { useState } from 'react';
import styled from 'styled-components';

import {
  handleConfirmCommentEdit,
  handleDeleteComment,
} from '../../../utils/firebase';

import Ripples from 'react-ripples';

import { ErrorMessage, Info, Message } from '../ErrorMessageUnits';

const Comment = ({ currentUser, share, comment, userData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleEnter = (e) => {
    if (e.charCode === 13) {
      handleConfirmCommentEdit(
        editedComment,
        share,
        comment,
        setEditedComment,
        setIsEdit,
        setErrorMessage,
        setShowErrorMessage
      );
    }
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
            disabled={!isEdit}
          />
          <ErrorMessage isShow={showErrorMessage}>
            <Info />
            <Message>{errorMessage}</Message>
          </ErrorMessage>
        </CommentContent>
      </CommentContainer>

      <CommentButtonRow>
        {currentUser.uid === comment.author.id && (
          <>
            <EditButton isEdit={isEdit} onClick={() => setIsEdit(true)}>
              編輯
            </EditButton>
            <ConfirmBtnRipples color="#fff" during={3000}>
              <ConfirmButton
                isEdit={isEdit}
                onClick={() =>
                  handleConfirmCommentEdit(
                    editedComment,
                    share,
                    comment,
                    setEditedComment,
                    setIsEdit,
                    setErrorMessage,
                    setShowErrorMessage
                  )
                }
              >
                確定
              </ConfirmButton>
            </ConfirmBtnRipples>
            <DeleteButton
              onClick={() => handleDeleteComment(share, comment, userData)}
            >
              刪除
            </DeleteButton>
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
  object-fit: cover;
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
  padding: 5px 5px;
`;

const CommentButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0 30px 0;
  font-size: 10px;
`;

const StyledButton = styled.button`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  border-radius: 5px;
  padding: 3px 6px;
  cursor: pointer;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const EditButton = styled(StyledButton)`
  display: ${(props) => (props.isEdit ? 'none' : 'block')};
  color: white;
  background-color: #52b788;
  margin-right: 5px;
`;

const ConfirmBtnRipples = styled(Ripples)`
  border-radius: 5px;
  margin-right: 5px;
`;

const ConfirmButton = styled(StyledButton)`
  display: ${(props) => (props.isEdit ? 'block' : 'none')};
  color: white;
  background-color: #1e88e5;
`;

const DeleteButton = styled(StyledButton)`
  color: #52b788;
  border: 1px solid #52b788;
`;

export default Comment;
