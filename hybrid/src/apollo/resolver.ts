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

const resolvers = {
  Query: {
    users: () => users,
    records: () => [],
  },
};

export default resolvers;
