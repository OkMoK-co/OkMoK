import styled from 'styled-components';

const TimerWrap = styled.div`
  display: flex;
  justify-content: space-around;
  height: 2rem;
  color: white;
`;

const PutButton = styled.button`
  color: black;
  background-color: #00ff00;
  border: solid #00ff00;
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export default function Timer() {
  return (
    <TimerWrap>
      <div>30</div>
      <PutButton>put</PutButton>
      <div>30</div>
    </TimerWrap>
  );
}
