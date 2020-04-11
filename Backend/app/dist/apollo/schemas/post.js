"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDef = apollo_server_express_1.gql `
    extend type Mutation {
        createPost(data: CreatePostInput): Post
        likePost(data: LikePostInput): Post
        addComment(data: AddCommentInput): Comment
    }

    input CreatePostInput {
        createdByUserID: ID!
        content: String!
    }
    input LikePostInput {
        userID: ID!
        postID: ID!
    }
    input AddCommentInput {
        userID: ID!
        postID: ID!
        content: String!
    }

    type Post {
        id: ID!
        createdBy: User!
        createdAt: String!
        likes: [ User ]!
        comments: [ Comment ]!
        content: String!
    }
    type Comment {
        id: ID!
        post: Post!
        createdBy: User!
        createdAt: String!
        content: String!
    }
`;
//# sourceMappingURL=post.js.map