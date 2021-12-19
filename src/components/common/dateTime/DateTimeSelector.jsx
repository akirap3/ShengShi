import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';

import { PopTitleContainer, PopTitle } from '../popup/PopupUnits';
import { CalendarIcon, Container } from './style/DateTimeSelector.style';
import CalendarImg from '../../../images/common/calendar.svg';

const DateTimeSelector = ({ share }) => {
  const dispatch = useDispatch();
  const specificDateTime = useSelector((state) => state.specificDateTime);

  return share ? (
    <>
      <PopTitleContainer>
        <CalendarIcon src={CalendarImg} alt="calendar" />
        <PopTitle>選擇日期及時間</PopTitle>
      </PopTitleContainer>
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
          onChange={(result) => {
            dispatch({ type: 'specificDateTime/selected', payload: result });
          }}
          secondAriaLabel="Second"
          value={specificDateTime}
          yearAriaLabel="Year"
          minDate={share.fromTimeStamp.toDate()}
          maxDate={share.toTimeStamp.toDate()}
        />
      </Container>
    </>
  ) : null;
};

export default DateTimeSelector;
