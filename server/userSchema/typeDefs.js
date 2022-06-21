const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    fName: String!
    lName: String!
    age: Int!
  }
  type token {
    token: String
  }
  input UserInput {
    fName: String
    lName: String
    age: Int
  }
  type Query {
    getAllUsers: [User!]!
  }

  type Mutation {
    addUser(UserInput: UserInput): token
    updateUser(id: String, fName: String): User!
    deleteUser(id: String): String
  }
`;

module.exports = typeDefs;
