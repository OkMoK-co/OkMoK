'use client';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FaFilter } from 'react-icons/fa';
import SearchDetail from '@/components/record/SearchDetail';
import SearchName from '@/components/record/SearchName';
import Tags from '@/components/record/Tags';
import styles from '@/styles/record/Record.module.scss';
import RecordItem from '@/components/record/RecordItem';

const RECORDS_QUERY = gql`
  query Records($filter: RecordFilter) {
    records(filter: $filter) {
      records {
        gameId
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
      <div>
        {data?.records.records.map((e: any) => (
          <RecordItem key={e.gameId} record={e} />
        ))}
      </div>
      <div> 페이지네이션 </div>
    </div>
  );
}
