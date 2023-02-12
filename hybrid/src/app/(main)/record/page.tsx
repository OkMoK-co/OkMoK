'use client';
import SearchDetail from '@/components/record/SearchDetail';
import SearchName from '@/components/record/SearchName';
import { useEffect, useState } from 'react';

interface filterType {
  name?: string;
  opponent?: string;
  dateFrom?: undefined; //Date 형식?
  dateTo?: undefined;
  leastMoves?: number;
}

export default function Record() {
  const [detail, setDetail] = useState(false);
  const [filter, setFilter] = useState<filterType>({});
  const onAddFilter = (tag: string, value: string | number) => {
    setFilter((prevState) => ({ ...prevState, [tag]: value }));
  };
  const onDetailButton = () => {
    setDetail((cur) => !cur);
  };
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <div>
      <h1>record</h1>
      <SearchName onAddFilter={onAddFilter} />
      <button onClick={onDetailButton}>more detail</button>
      {detail ? <SearchDetail filters={filter} /> : <div>tag들</div>}
      <div> 리스트 </div>
      <div> 페이지네이션 </div>
    </div>
  );
}
