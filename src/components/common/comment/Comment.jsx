import { useState } from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';
import { ErrorMessage, Info, Message } from '../ErrorMessageUnits';
import {
  handleConfirmCommentEdit,
  handleDeleteComment,
} from '../../../utils/firebase';

const Comment = ({ currentUser, share, comment, userData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { author, createdAt, commentContent } = comment;

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
        <CommentAvatar src={author.imageUrl} />
        <CommentContent>
          <CommentRow>
            <CommentAuthor>{author.displayName}</CommentAuthor>
            <CommentDateTime>
              {createdAt.toDate().toLocaleString()}
            </CommentDateTime>
          </CommentRow>
          <CommentText
            value={isEdit ? editedComment : commentContent}
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
        {currentUser.uid === author.id && (
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
  margin-right: 10px;
  margin-top: 5px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  object-fit: cover;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid lightskyblue;
  border-radius: 5px;
`;

const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const CommentAuthor = styled.div`
  margin-right: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
`;

const CommentDateTime = styled.div`
  font-size: 10px;
  color: rgba(129, 129, 129, 0.68);
`;

const CommentText = styled.input`
  width: 100%;
  padding: 5px 5px;
  outline: none;
  border: ${({ isEdit }) => (isEdit ? '1px solid #52b78854' : 'none')};
  border-radius: 5px;
`;

const CommentButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0 30px 0;
  font-size: 10px;
`;

const StyledButton = styled.button`
  padding: 3px 6px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  cursor: pointer;
`;

const EditButton = styled(StyledButton)`
  margin-right: 5px;
  display: ${({ isEdit }) => (isEdit ? 'none' : 'block')};
  background-color: #52b788;
  color: white;
`;

const ConfirmBtnRipples = styled(Ripples)`
  margin-right: 5px;
  border-radius: 5px;
`;

const ConfirmButton = styled(StyledButton)`
  display: ${({ isEdit }) => (isEdit ? 'block' : 'none')};
  background-color: #1e88e5;
  color: white;
`;

const DeleteButton = styled(StyledButton)`
  border: 1px solid #52b788;
  color: #52b788;
`;

export default Comment;
