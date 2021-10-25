import React, { useState } from 'react';
import styled from 'styled-components';
import DateTimePicker from 'react-datetime-picker';

const DateTimeSelector = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Title>請選擇日期及時間</Title>
      <Container>
        <DateTimePicker
          amPmAriaLabel="Select AM/PM"
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          hourAriaLabel="Hour"
          maxDetail="second"
          minuteAriaLabel="Minute"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date and time"
          onChange={onChange}
          secondAriaLabel="Second"
          value={value}
          yearAriaLabel="Year"
        />
      </Container>
    </>
  );
};

const Title = styled.div`
  font-size: 2.2vw;
`;

const Container = styled.div`
  .react-datetime-picker {
    display: flex;
    flex-wrap: wrap;
  }
  .react-datetime-picker__wrapper {
    /* flex-direction: column; */
    /* position: relative; */
    margin-top: 2vw;
    border-radius: 5px;
    padding: 1vw;
    background-color: lightgray;
    opacity: 0.8;

    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
  }
  .react-datetime-picker__inputGroup {
    font-size: 2vw;
    text-align: center;

    @media screen and (min-width: 840px) {
      font-size: inherit;
    }
  }

  .react-datetime-picker__button {
    border: 1px solid black;
    border-radius: 5px;
    margin-right: 1vw;
    @media screen and (max-width: 700px) {
      margin-top: 1vw;
    }
  }
  .react-datetime-picker__clear-button {
    background-color: lightskyblue;
    align-self: center;
    @media screen and (max-width: 700px) {
      padding: 1vw 10vw;
    }
  }

  .react-datetime-picker__calendar-button {
    background-color: lightseagreen;
    align-self: center;
    @media screen and (max-width: 700px) {
      padding: 1vw 10vw;
    }
  }

  .react-datetime-picker__button__icon {
    width: 2vw;
    height: 2vw;
  }
`;

export default DateTimeSelector;
