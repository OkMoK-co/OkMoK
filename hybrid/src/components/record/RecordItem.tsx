interface recordItemProps {
  record: {
    createAt: string;
    leastMoves: number;
    timeLimit: number;
  };
}

export default function RecordItem({ record }: recordItemProps) {
  return (
    <div>
      <div> {record.createAt} </div>
      <div> leastMoves {record.leastMoves} </div>
      <div> timelimit {record.timeLimit} </div>
    </div>
  );
}
