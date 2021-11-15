import React from 'react';
import styled from 'styled-components';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useDispatch, useSelector } from 'react-redux';

import CalendarImg from '../../images/common/calendar.svg';

const DateTimeRangeSelector = () => {
  const dispatch = useDispatch();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  return (
    <>
      <PopTitleContainer>
        <CalendarIcon src={CalendarImg} />
        <Title>選擇日期及時間</Title>
      </PopTitleContainer>
      <Container>
        <DateTimeRangePicker
          onChange={(results) =>
            dispatch({ type: 'fromToDateTime/selected', payload: results })
          }
          value={fromToDateTime}
          minDate={new Date()}
        />
      </Container>
    </>
  );
};

const PopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #52b788;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const CalendarIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Title = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: white;
`;
const Container = styled.div`
  .react-datetimerange-picker {
    display: flex;
  }
  .react-datetimerange-picker__wrapper {
    flex-direction: column;
    position: relative;
    margin-top: 15px;
    border-radius: 5px;
    padding: 10px;
    background-color: #b7e4c7;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

    @media screen and (min-width: 800px) {
      flex-direction: row;
    }
  }
  .react-datetimerange-picker__inputGroup {
    font-size: 14px;
    min-width: 20px;
    text-align: center;

    @media screen and (min-width: 800px) {
      font-size: inherit;
    }
  }

  .react-datetimerange-picker__button {
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 5px;
    padding: 5px 30px;
  }
  .react-datetimerange-picker__clear-button {
    background-color: lightskyblue;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
    @media screen and (min-width: 800px) {
      margin-right: 5px;
    }
  }

  .react-datetimerange-picker__calendar-button {
    background-color: lightseagreen;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  }

  .react-calendar {
    font-size: 14px;
    max-width: 67%;
    border-radius: 5px;
    @media screen and (min-width: 520px) {
      max-width: 100%;
    }
  }
`;

export default DateTimeRangeSelector;
