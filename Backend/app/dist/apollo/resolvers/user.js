"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        login: async (parent, args, { prisma }) => {
            const resp = await prisma.users({
                where: {
                    AND: [{ email: args.data.email }, { password: args.data.password }],
                },
            });
            if (resp[0]) {
                return {
                    success: true,
                    user: resp[0],
                };
            }
            else {
                return {
                    success: false,
                };
            }
        },
        users: async (parent, args, { prisma }) => await prisma.users({
            where: {
                OR: [{ id: args.data.id }, { fullName: args.data.fullName }],
            },
        }),
        friends: async (parent, args, { prisma }) => await prisma.user.where({ id: args.id }).friends(),
    },
    Mutation: {
        register: async (parent, args, { prisma }) => {
            const resp = await prisma.createUser({ ...args.data });
            if (resp) {
                return {
                    success: true,
                    user: resp,
                };
            }
            else {
                return {
                    success: false,
                };
            }
        },
    },
};
//# sourceMappingURL=user.js.map