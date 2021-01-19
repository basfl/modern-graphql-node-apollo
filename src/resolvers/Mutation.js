import bcrypt from 'bcryptjs'
const Mutation = {

    async createUser(parent, args, {
        prisma
    }, info) {

        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password = await bcrypt.hash(args.data.password, 10)

        return prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        }, info)

    },
    async updateUser(parent, args, {
        prisma
    }, info) {

        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info);

    },
    async deleteUser(parent, args, {
        prisma
    }, info) {

        const userExist = await prisma.exists.User({
            id: args.id
        });
        if (!userExist) {
            throw new Error("user not found");
        }
        const opArgs = {};
        opArgs.where = {
            id: args.id
        };
        console.log(opArgs)
        return prisma.mutation.deleteUser(opArgs, info);



    },
    async createPost(parent, args, {
        prisma,
    }, info) {
        const opArgs = {
            title: args.post.title,
            body: args.post.body,
            published: args.post.published,
            author: {
                connect: {
                    id: args.post.author
                }
            }
        };
        return prisma.mutation.createPost({
            data: opArgs
        }, info);


    },
    async deletePost(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);
    },
    async updatePost(parent, args, {
        prisma
    }, info) {

        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info);


    },
    async createComment(parent, args, {
        prisma
    }, info) {

        // console.log(args.comment.post);
        return prisma.mutation.createComment({
            data: {
                text: args.comment.text,
                author: {
                    connect: {
                        id: args.comment.author
                    }
                },
                post: {
                    connect: {
                        id: args.comment.post
                    }
                }

            }
        }, info);

    },
    async deleteComment(parent, args, {
        prisma
    }, info) {

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)


    },
    async updateComment(parent, args, {
        prisma
    }, info) {

        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)

    }
}

export {
    Mutation as
    default
}