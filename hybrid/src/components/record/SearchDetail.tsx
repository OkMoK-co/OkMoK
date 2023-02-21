'use client';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { filterType, onAddFilterType } from '@/app/(main)/record/page';

interface searchDetailProps {
  filters: filterType;
  onAddFilter: onAddFilterType;
  onDetail: () => void;
}

export default function SearchDetail({
  filters,
  onAddFilter,
  onDetail,
}: searchDetailProps) {
  const [opponent, setOpponent] = useState(filters.opponent);
  const [dateFrom, setDateFrom] = useState(filters.dateFrom);
  const [dateTo, setDateTo] = useState(filters.dateTo);
  const [leastMoves, setLeastMoves] = useState(filters.leastMoves);
  const [timeLimit, setTimeLimit] = useState(filters.timeLimit);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (opponent) onAddFilter('opponent', opponent);
    if (dateFrom) onAddFilter('dateFrom', dateFrom);
    if (dateTo) onAddFilter('dateTo', dateTo);
    if (leastMoves !== undefined) onAddFilter('leastMoves', leastMoves);
    if (timeLimit !== undefined) onAddFilter('timeLimit', timeLimit);
    onDetail();
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div> opponent </div>
        <input
          value={opponent ?? ''}
          onChange={(e) => {
            setOpponent(e.target.value);
          }}
        />
        <div> Date </div>
        <input
          type='date'
          value={filters.dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value);
          }}
        />
        ~
        <input
          type='date'
          value={filters.dateTo}
          onChange={(e) => {
            setDateTo(e.target.value);
          }}
        />
        <div>least moves</div>
        <input
          type='number'
          value={leastMoves ?? ''}
          maxLength={3}
          onChange={(e) => {
            setLeastMoves(Number(e.target.value));
          }}
        />
        <div>time Limits</div>
        <input
          type='number'
          value={timeLimit ?? ''}
          maxLength={2}
          onChange={(e) => {
            setTimeLimit(Number(e.target.value));
          }}
        />
        <button type='submit'>
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
