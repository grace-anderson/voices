const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    stories: [Story]!
  }

  type Story {
    _id: ID
    storyTitle: String
    storyIntro: String
    myStory: String
    storyAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    stories(username: String): [Story]
    story(storyId: ID!): Story
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addStory(storyTitle: String!, storyIntro: String!, myStory: String!): Story
    addComment(storyId: ID!, commentText: String!): Story
    removeStory(storyId: ID!): Story
    removeComment(storyId: ID!, commentId: ID!): Story
  }
`;

module.exports = typeDefs;
