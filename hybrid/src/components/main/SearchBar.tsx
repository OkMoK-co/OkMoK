'use client';

import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from '../../styles/main/Main.module.scss';

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValid = /^[\d]+$/;
    if (numberValid.test(event.target.value) || event.target.value === '')
      setKeyword(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type='text'
        onChange={keywordHandler}
        placeholder='방 번호로 검색하기'
        maxLength={10}
        value={keyword}
      />
      {keyword ? (
        <span onClick={() => setKeyword('')}>
          <IoIosCloseCircle />
        </span>
      ) : (
        <span>
          <GoSearch />
        </span>
      )}
    </div>
  );
}
