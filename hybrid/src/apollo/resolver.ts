//임시 데이터
const users = [
  {
    name: 'jabae',
    profileMessage: '📏🍐🛳️🚢',
  },
  {
    name: 'jiyo',
    profileMessage: '👼🏻',
  },
  {
    name: 'donghyuk',
    profileMessage: '🔐',
  },
];

const records = [
  {
    gameId: 1,
    createAt: '2023-02-21 14:30',
    leastMoves: 50,
    timeLimit: 30,
  },
  {
    gameId: 2,
    createAt: '2023-02-21 14:33',
    leastMoves: 32,
    timeLimit: 30,
  },
];

const resolvers = {
  Query: {
    users: () => users,
    records: (_: any, { filter }: any) => {
      //filter를 자알 적용시켜서 디비에다가 자알 요청하구..?!
      //페이지도 자알 계산하구?! 그래서 자알 리턴해줘야하는데?!
      //어떻게 해야할까요?
      return { records: records, currentPage: 1, totalPage: 2 };
    },
  },
};

export default resolvers;
