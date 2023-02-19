'use client';
import SearchDetail from '@/components/record/SearchDetail';
import SearchName from '@/components/record/SearchName';
import Tags from '@/components/record/Tags';
import { useEffect, useState } from 'react';

//이거 어디에 두지? type을 따로 둬야할고가타
export interface filterType {
  [tag: string]: string | number;
  // name?: string;
  // opponent?: string;
  // dateFrom?: undefined;
  // dateTo?: undefined;
  // leastMoves?: number;
  // timelimits?: number;
}
export interface onAddFilterType {
  (tag: string, value: string | number): void;
}

export default function Record() {
  const [detail, setDetail] = useState(false);
  const [filter, setFilter] = useState<filterType>({});
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
    console.log(filter);
  }, [filter]);
  return (
    <div>
      <h1>record</h1>
      <SearchName onAddFilter={onAddFilter} />
      <button onClick={onDetail}>more detail</button>
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
