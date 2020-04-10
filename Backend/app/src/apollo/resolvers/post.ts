export const resolvers = {
	Mutation: {
		createPost: async (parent, args, { prisma }) =>
			await prisma.createPost({
				createdBy: { connect: { id: args.data.createdByUserID } },
				content: args.data.content,
			}),
		likePost: async (parent, args, { prisma }) =>
			await prisma.updatePost({
				where: { id: args.data.postID },
				data: { likes: { connect: { id: args.data.userID } } },
			}),
		addComment: async (parent, args, { prisma }) =>
			await prisma.createComment({
				content: args.data.content,
				post: {
					connect: { id: args.data.postID },
				},
				createdBy: { connect: { id: args.data.userID } },
			}),
	},
	Post: {
		createdBy: async (parent, args, { prisma }) =>
			await prisma.post({ id: parent.id }).createdBy(),
		likes: async (parent, args, { prisma }) =>
			await prisma.post({ id: parent.id }).likes(),
		comments: async (parent, args, { prisma }) =>
			await prisma.post({ id: parent.id }).comments(),
	},
	Comment: {
		createdBy: async (parent, args, { prisma }) =>
			await prisma.comment({ id: parent.id }).createdBy(),
		post: async (parent, args, { prisma }) =>
			await prisma.comment({ id: parent.id }).post(),
	},
};
