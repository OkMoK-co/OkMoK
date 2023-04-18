import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { ImEnter } from 'react-icons/im';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import { makeEnterRoomBody } from './RoomItem';
import styled from 'styled-components';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roomValid = /^$|^[0-9]+$/;
    if (roomValid.test(event.target.value)) setSearch(event.target.value);
  };

  const enterRoomHandler = useRequest({
    id: socketVar.ROOM_ENTER_REQUEST,
    body: makeEnterRoomBody(Number(search)),
  });

  return (
    <Container>
      <input
        type='text'
        value={search}
        onChange={searchHandler}
        maxLength={10}
        placeholder='Enter by room number...'
      />
      {search ? (
        <button onClick={enterRoomHandler}>
          <ImEnter />
        </button>
      ) : (
        <button>
          <IoSearch />
        </button>
      )}
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexs.spaceBetween}
  height: 100%;
  width: 18rem;
  padding: 0 1.5rem;
  border-radius: ${({ theme }) => theme.radiuses.big};
  border: ${({ theme }) => `${theme.thick.bold} solid ${theme.colors.white}`};
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 12rem;
    padding: 0 0.7rem;
    border: ${({ theme }) => `${theme.thick.middle} solid`};
    font-size: ${({ theme }) => theme.fontsizes.small};
  }
`;
