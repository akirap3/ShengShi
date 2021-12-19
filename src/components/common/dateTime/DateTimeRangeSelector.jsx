import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useDispatch, useSelector } from 'react-redux';

import { PopTitleContainer, PopTitle } from '../popup/PopupUnits';
import { CalendarIcon, Container } from './style/DateTimeRangeSelector.style';
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

export default DateTimeRangeSelector;
