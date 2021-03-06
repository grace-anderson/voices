import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($myProfile: String!) {
    addProfile(myProfile: $myProfile) {
      myProfile
    }
  }
`;

export const ADD_STORY = gql`
  mutation addStory(
    $storyTitle: String!
    $storyIntro: String!
    $myStory: String!
  ) {
    addStory(
      storyTitle: $storyTitle
      storyIntro: $storyIntro
      myStory: $myStory
    ) {
      _id
      storyTitle
      storyIntro
      myStory
      storyAuthor
      createdAt
    }
  }
`;
