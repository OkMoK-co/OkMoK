import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '@/styles/record/Record.module.scss';

interface searchNameProps {
  onAddFilter: (tag: string, value: string | number) => void;
}

export default function SearchName({ onAddFilter }: searchNameProps) {
  const [value, setValue] = useState('');
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor='record-search-user'>유저 검색</label>
      <input
        id='record-search-user'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (value) onAddFilter('name', value);
          setValue('');
        }}
      >
        <FaSearch />
      </button>
    </form>
  );
}
