import { useState } from 'react';
import styled from 'styled-components';

export default function KickoutButton() {
  const [isActivate, setActivate] = useState(true);
  return <Button active={isActivate}> kick out </Button>;
}

const Button = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? '#ffff00' : '#808080')};
  background-color: black;
  border: solid ${(props) => (props.active ? '#ffff00' : '#808080')};
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
