import { useState } from 'react';
import { IoSearch, IoCloseCircle } from 'react-icons/io5';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roomValid = /^$|^[0-9]+$/;
    if (roomValid.test(event.target.value)) setSearch(event.target.value);
  };

  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={searchHandler}
        maxLength={10}
        placeholder='방 번호로 입장하기'
      />
      <button>
        <IoSearch />
      </button>
    </div>
  );
}
