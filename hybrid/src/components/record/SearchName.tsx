import { useState } from 'react';

interface searchNameProps {
  onAddFilter: (tag: string, value: string | number) => void;
}
export default function SearchName({ onAddFilter }: searchNameProps) {
  const [value, setValue] = useState('');
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='record-search-user'>Search user</label>
        <input
          id='record-search-user'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            onAddFilter('name', value);
            setValue('');
          }}
        >
          search
        </button>
      </form>
    </div>
  );
}
