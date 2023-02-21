import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    name: String!
    profileMessage: String
  }
  type Record {
    gameId: Int
    createAt: String
    moves: Int
    limit: Int
  }
  input RecordFilter {
    page: Int!
    count: Int!
    name: String
    opponent: String
    dateFrom: String
    dateTo: String
    moves: Int
    timeLimit: Int
  }
  type Query {
    users: [User]
    records(filter: RecordFilter): [Record]
  }
`;
