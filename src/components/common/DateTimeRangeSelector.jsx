import React from 'react';
import styled from 'styled-components';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useDispatch, useSelector } from 'react-redux';

const DateTimeRangeSelector = () => {
  const dispatch = useDispatch();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  return (
    <>
      <Title>請選擇日期及時間區間</Title>
      <Container>
        <DateTimeRangePicker
          onChange={(results) =>
            dispatch({ type: 'fromToDateTime/selected', payload: results })
          }
          value={fromToDateTime}
        />
      </Container>
    </>
  );
};

const Title = styled.div`
  font-size: 2.2vw;
`;
const Container = styled.div`
  .react-datetimerange-picker {
    display: flex;
    flex-wrap: wrap;
  }
  .react-datetimerange-picker__wrapper {
    flex-direction: column;
    position: relative;
    margin-top: 2vw;
    border-radius: 5px;
    padding: 1vw;
    background-color: lightgray;
    opacity: 0.8;
  }
  .react-datetimerange-picker__inputGroup {
    font-size: 2vw;
    text-align: center;

    @media screen and (min-width: 840px) {
      font-size: inherit;
    }
  }

  .react-datetimerange-picker__button {
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5vw 26%;
    margin-top: 0.5vw;
  }
  .react-datetimerange-picker__clear-button {
    background-color: lightskyblue;
  }

  .react-datetimerange-picker__calendar-button {
    background-color: lightseagreen;
  }

  .react-datetimerange-picker__button__icon {
    width: 2vw;
    height: 2vw;
  }
`;

export default DateTimeRangeSelector;
