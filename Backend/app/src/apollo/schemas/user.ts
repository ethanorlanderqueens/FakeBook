import { gql } from "apollo-server-express";

export const typeDef = gql`

    extend type Query {
        login(data: loginInput): loginResponse
        users(data: usersInput): [ User ]!
        friends(data: friendsInput): [ User ]!
    }

    extend type Mutation {
        register(data: registerInput): registerResponse
    }

    input loginInput {
        email: String!
        password: String!
    }
    input usersInput {
        id: ID
        fullName: String
    }
    input friendsInput {
        userID: ID!
    }
    input registerInput {
        fullName: String!
        email: String!
        password: String!
    }
    //TODO Add conversations, outgoingFriendRequests, incomingFriendRequests
    type User {
        id: ID!
        fullName: String!
        email: String!
        friends: [ User ]!
        posts: [ Post ]!
    }
    type loginResponse {
        success: Boolean!
        user: User
    }
    type registerResponse {
        success: Boolean!
        user: User
    }

`;