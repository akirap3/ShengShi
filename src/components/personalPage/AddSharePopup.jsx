import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';

import CalendarPopup from '../personalPage/myShareList/CalendarPopup';

import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { BsCalendarCheckFill } from 'react-icons/bs';

const AddSharePopup = ({ showEdit, closeEditor }) => {
  const uploadRef = useRef();
  const [showCalender, setShowCalendar] = useState(false);
  const [file, setFile] = useState(null);

  const openCalendar = () => setShowCalendar(true);
  const closeCalendar = () => setShowCalendar(false);

  const previewImgUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';

  return (
    <>
      <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
        <DialogContent
          style={{
            position: 'relative',
            border: 'solid 1px lightBlue',
            borderRadius: '10px',
          }}
        >
          <PopClose onClick={closeEditor} />
          <PopTitleContainer>
            <CrownIcon />
            <PopTitle>好吃的麵包</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PopRow>
              <FoodLabel>食物名稱</FoodLabel>
              <FoodName />
            </PopRow>
            <PopRow>
              <QuantityLabel>數量</QuantityLabel>
              <Quantity />
            </PopRow>
            <PopRow>
              <DateTimeLabel>日期及時間</DateTimeLabel>
              <DateTime>2021-10-15 20:00</DateTime>
              <Calendar onClick={openCalendar} />
            </PopRow>
            <PopRow>
              <PopPlaceLabel>地點</PopPlaceLabel>
              <PopPlace />
              <PopPlaceIcon />
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
              <ImgUpload ref={uploadRef} htmlFor="image-upload">
                上傳
              </ImgUpload>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </PopRow>
            <PreviewImg src={previewImgUrl} />
            <SubmitBtn>分享</SubmitBtn>
          </PopContent>
        </DialogContent>
      </DialogOverlay>
      <CalendarPopup
        showCalender={showCalender}
        closeCalendar={closeCalendar}
      />
    </>
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

const PopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1vw;
  border-bottom: 1px solid lightskyblue;
`;

const CrownIcon = styled(BiCrown)`
  fill: lightskyblue;
  width: 3vw;
  height: 3vw;
  margin-right: 2vw;
`;

const PopTitle = styled.div`
  font-size: 2.5vw;
`;

const PopContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 1.5vw;
`;

const PopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 1.5vw;
  margin-bottom: 2vw;
`;

const FoodLabel = styled.label`
  width: 9vw;
`;

const FoodName = styled.input`
  flex-grow: 1;
`;

const QuantityLabel = styled.label`
  width: 9vw;
`;

const Quantity = styled.input``;

const DateTimeLabel = styled.label`
  width: 9vw;
`;

const DateTime = styled.span`
  margin-right: 1vw;
`;

const Calendar = styled(BsCalendarCheckFill)`
  width: 2vw;
  height: 2vw;
  fill: lightseagreen;
  cursor: pointer;
`;

const PopPlaceLabel = styled.label`
  width: 9vw;
`;

const PopPlace = styled.input`
  margin-right: 1vw;
`;

const PopPlaceIcon = styled(GrLocation)`
  width: 2vw;
  height: 2vw;
`;

const FoodImgLabel = styled.label`
  width: 9vw;
`;

const ImgUpload = styled.label`
  border: 1px solid lightslategrey;
  border-radius: 5px;
  background-color: lightskyblue;
  padding: 0.5vw;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
  margin-bottom: 2vw;
`;

const SubmitBtn = styled.button`
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  background-color: lightskyblue;
  color: white;
  cursor: pointer;
  padding: 1vw;
  letter-spacing: 0.5vw;
`;

export default AddSharePopup;