"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDef = apollo_server_express_1.gql `
    extend type Query {
        login(data: LoginInput): LoginResponse
        users(data: UsersInput): [ User ]!
        friends(data: FriendsInput): [ User ]!
    }

    extend type Mutation {
        register(data: RegisterInput): RegisterResponse
    }

    input LoginInput {
        email: String!
        password: String!
    }
    input UsersInput {
        id: ID
        fullName: String
    }
    input FriendsInput {
        userID: ID!
    }
    input RegisterInput {
        fullName: String!
        email: String!
        password: String!
    }

    # TODO Add conversations
    type User {
        id: ID!
        fullName: String!
        email: String!
        incomingFriendRequests: [ FriendRequest ]!
        outgoingFriendRequests: [ FriendRequest ]!
        friends: [ User ]!
        posts: [ Post ]!
    }
    type LoginResponse {
        success: Boolean!
        user: User
    }
    type RegisterResponse {
        success: Boolean!
        user: User
    }

`;
//# sourceMappingURL=user.js.map