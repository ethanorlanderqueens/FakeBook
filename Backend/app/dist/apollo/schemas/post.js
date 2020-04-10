"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDef = apollo_server_express_1.gql `
    extend type Mutation {
        createPost(data: createPostInput): Post
        likePost(data: likePostInput): Post
        addComment(data: addCommentInput): Comment
    }

    input createPostInput {
        createdByUserID: ID!
        content: String!
    }
    input likePostInput {
        userID: ID!
        postID: ID!
    }
    input addCommentInput {
        userID: ID!
        postID: ID!
        content: String!
    }

    type Post {
        id: ID!
        createdBy: User!
        createdAt: Float!
        likes: [ User ]!
        comments: [ Comment ]!
        content: String!
    }
    type Comment {
        id: ID!
        post: Post!
        createdBy: User!
        createdAt: Float!
        content: String!
    }
`;
//# sourceMappingURL=post.js.map