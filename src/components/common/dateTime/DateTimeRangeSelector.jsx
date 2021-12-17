import styled from 'styled-components';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useDispatch, useSelector } from 'react-redux';

import { PopTitleContainer, PopTitle } from '../popup/PopupUnits';
import CalendarImg from '../../../images/common/calendar.svg';

const DateTimeRangeSelector = () => {
  const dispatch = useDispatch();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  const now = new Date();

  return (
    <>
      <PopTitleContainer>
        <CalendarIcon src={CalendarImg} alt="calendar" />
        <PopTitle>選擇日期及時間</PopTitle>
      </PopTitleContainer>
      <Container>
        <DateTimeRangePicker
          onChange={(results) => {
            if (results && results[0] < now) {
              dispatch({
                type: 'fromToDateTime/selected',
                payload: [now, results[1]],
              });
            } else {
              dispatch({ type: 'fromToDateTime/selected', payload: results });
            }
          }}
          value={fromToDateTime}
          minDate={new Date()}
          disableClock={true}
        />
      </Container>
    </>
  );
};

const CalendarIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Container = styled.div`
  .react-datetimerange-picker {
    display: flex;
  }
  .react-datetimerange-picker__wrapper {
    flex-direction: column;
    position: relative;
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: #b7e4c7;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

    @media screen and (min-width: 800px) {
      flex-direction: row;
    }
  }
  .react-datetimerange-picker__inputGroup {
    font-size: 14px;
    min-width: 24px;
    text-align: center;

    @media screen and (min-width: 800px) {
      font-size: inherit;
    }
  }

  .react-datetimerange-picker__button {
    margin-top: 5px;
    padding: 5px 30px;
    border: 1px solid black;
    border-radius: 5px;
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
    max-width: 67%;
    font-size: 14px;
    border-radius: 5px;
    @media screen and (min-width: 520px) {
      max-width: 100%;
    }
  }
`;

export default DateTimeRangeSelector;
