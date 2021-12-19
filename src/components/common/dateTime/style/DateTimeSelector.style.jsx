import styled from 'styled-components';

const CalendarIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Container = styled.div`
  .react-datetime-picker {
    display: flex;
  }
  .react-datetime-picker__wrapper {
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
  .react-datetime-picker__inputGroup {
    font-size: 14px;
    min-width: 24px;
    text-align: center;

    @media screen and (min-width: 800px) {
      font-size: inherit;
    }
  }

  .react-datetime-picker__button {
    margin-top: 5px;
    padding: 5px 30px;
    border: 1px solid black;
    border-radius: 5px;
  }
  .react-datetime-picker__clear-button {
    align-self: center;
    width: fit-content;
    background-color: lightskyblue;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
    @media screen and (min-width: 800px) {
      margin-right: 5px;
    }
  }

  .react-datetime-picker__calendar-button {
    align-self: center;
    width: fit-content;
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

export { CalendarIcon, Container };
