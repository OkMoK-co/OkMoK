'use client';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FaFilter } from 'react-icons/fa';
import SearchDetail from '@/components/record/SearchDetail';
import SearchName from '@/components/record/SearchName';
import Tags from '@/components/record/Tags';
import styles from '@/styles/record/Record.module.scss';

const RECORDS_QUERY = gql`
  query Records($filter: RecordFilter) {
    records(filter: $filter) {
      records {
        createAt
        leastMoves
        timeLimit
      }
      currentPage
      totalPage
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
  const { loading, error, data } = useQuery(RECORDS_QUERY, {
    variables: {
      filter: {
        page: 1,
        count: 10,
        ...filter,
      },
    },
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
  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);
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
