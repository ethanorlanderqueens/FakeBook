"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Mutation: {
        requestFriend: async (parent, args, { prisma }) => {
            const friendRequest = await prisma.createFriendRequest({
                fromUser: { connect: { id: args.data.fromUserID } },
                toUser: { connect: { id: args.data.toUserID } },
            });
            await prisma.updateUser({
                where: { id: args.data.fromUserID },
                data: { outgoingFriendRequests: { connect: { id: friendRequest.id } } },
            });
            await prisma.updateUser({
                where: { id: args.data.toUserID },
                data: { incomingFriendRequests: { connect: { id: friendRequest.id } } },
            });
            return friendRequest;
        },
        respondToFriendRequest: async (parent, args, { prisma }) => {
            const friendRequest = await prisma.friendRequest({
                id: args.data.friendRequestID,
            });
            if (args.data.accept) {
                //Add from to to's friend list
                await prisma.updateUser({
                    where: { id: friendRequest.toUserID },
                    data: { friends: { connect: { id: friendRequest.fromUserID } } },
                });
                //Add to to from's friend list
                await prisma.updateUser({
                    where: { id: friendRequest.fromUserID },
                    data: { friends: { connect: { id: friendRequest.toUserID } } },
                });
            }
            return await prisma.deleteFriendRequest({ id: args.friendRequestID });
        },
    },
    Query: {
        incomingFriendRequests: async (parent, args, { prisma }) => await prisma.user({ id: args.data.userID }).incomingFriendRequests(),
        outgoingFriendRequests: async (parent, args, { prisma }) => await prisma.user({ id: args.data.userID }).outgoingFriendRequests(),
    },
    FriendRequest: {
        fromUser: async (parent, args, { prisma }) => await prisma.friendRequest({ id: parent.id }).fromUser(),
        toUser: async (parent, args, { prisma }) => await prisma.friendRequest({ id: parent.id }).toUser(),
    },
};
//# sourceMappingURL=friendRequest.js.map