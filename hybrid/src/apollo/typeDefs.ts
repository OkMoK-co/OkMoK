import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    name: String!
    profileMessage: String
  }
  type Query {
    users: [User]
  }
`;
