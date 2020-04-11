"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDef = apollo_server_express_1.gql `
	extend type Query {
		incomingFriendRequests(data: IncomingFriendRequestsInput): [FriendRequest]!
        outgoingFriendRequests(data: OutgoingFriendRequestsInput): [FriendRequest]!
	}

	extend type Mutation {
		requestFriend(data: RequestFriendInput): FriendRequest
		respondToFriendRequest(data: RespondToFriendRequestInput): FriendRequest
	}

	input RespondToFriendRequestInput {
		friendRequestID: ID!
		accept: Boolean!
	}
	input RequestFriendInput {
		fromUserID: ID!
		toUserID: ID!
	}
	input IncomingFriendRequestsInput {
		userID: ID!
	}
    input OutgoingFriendRequestsInput {
		userID: ID!
	}

	type FriendRequest {
        id: ID!
		fromUser: User!
		toUser: User!
		accepted: Boolean!
		createdAt: String!
	}
`;
//# sourceMappingURL=friendRequest.js.map