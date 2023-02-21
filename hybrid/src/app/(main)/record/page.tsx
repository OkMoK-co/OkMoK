'use client';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FaFilter } from 'react-icons/fa';
import SearchDetail from '@/components/record/SearchDetail';
import SearchName from '@/components/record/SearchName';
import Tags from '@/components/record/Tags';
import styles from '@/styles/record/Record.module.scss';

const USERS_QUERY = gql`
  query Users {
    users {
      name
      profileMessage
    }
  }
`;

export interface filterType {
  [tag: string]: string | number;
}
export interface onAddFilterType {
  (tag: string, value: string | number): void;
}

export default function Record() {
  const [detail, setDetail] = useState(false);
  const [filter, setFilter] = useState<filterType>({});
  const { loading, error, data } = useQuery(USERS_QUERY, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const onAddFilter: onAddFilterType = (tag, value) => {
    setFilter((cur) => ({ ...cur, [tag]: value }));
  };
  const onDeleteFilter = (tag: string) => {
    setFilter((cur) => {
      let newFilter = { ...cur };
      delete newFilter[tag];
      return newFilter;
    });
  };
  const onDetail = () => {
    setDetail((cur) => !cur);
  };
  useEffect(() => {
    //test용 코드입니다.
    console.log(filter);
  }, [filter]);
  return (
    <div className={styles.pageWrap}>
      <h1>record</h1>
      <div className={styles.searchName}>
        <SearchName onAddFilter={onAddFilter} />
        <button onClick={onDetail}>
          <FaFilter />
        </button>
      </div>
      {detail ? (
        <SearchDetail
          filters={filter}
          onAddFilter={onAddFilter}
          onDetail={onDetail}
        />
      ) : (
        <Tags filter={filter} onDeleteFilter={onDeleteFilter} />
      )}
      <div> 리스트... </div>
      <div> 페이지네이션 </div>
    </div>
  );
}
