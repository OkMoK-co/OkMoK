import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { ImEnter } from 'react-icons/im';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import { makeEnterRoomBody } from './RoomItem';

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
    <div>
      <input
        type='text'
        value={search}
        onChange={searchHandler}
        maxLength={10}
        placeholder='Enter by room number'
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
    </div>
  );
}
