import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? '#00ff00' : '#808080')};
  background-color: black;
  border: solid ${(props) => (props.active ? '#00ff00' : '#808080')};
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export default function GiveupButton() {
  const [isActivate, setActivate] = useState(false);
  return <Button active={isActivate}> give up </Button>;
}
