"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDef = apollo_server_express_1.gql `

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
//# sourceMappingURL=user.js.map