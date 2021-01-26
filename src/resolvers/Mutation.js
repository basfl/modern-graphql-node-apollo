import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken'
const Mutation = {

    async createUser(parent, args, {
        prisma
    }, info) {

        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password = await bcrypt.hash(args.data.password, 10)

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        });
        return ({
            user,
            token: generateToken(user.id)
        })

    },
    async login(parrent, args, {
        prisma
    }, info) {

        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return ({
            user,
            token: generateToken(user.id)
        });


    },
    async updateUser(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info);

    },
    async deleteUser(parent, args, {
        prisma,
        request
    }, info) {

        const userId = getUserId(request);
        const userExist = await prisma.exists.User({
            id: userId
        });
        if (!userExist) {
            throw new Error("user not found");
        }
        const opArgs = {};
        opArgs.where = {
            id: userId
        };

        return prisma.mutation.deleteUser(opArgs, info);



    },
    async createPost(parent, args, {
        prisma,
        request
    }, info) {

        const userId = getUserId(request);
        const opArgs = {
            title: args.post.title,
            body: args.post.body,
            published: args.post.published,
            author: {
                connect: {
                    id: userId
                }
            }
        };
        return prisma.mutation.createPost({
            data: opArgs
        }, info);


    },
    async deletePost(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });
        if (!postExists) {
            throw new("****unable to delete the post");
        }
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);
    },
    async updatePost(parent, args, {
        prisma,
        request
    }, info) {

        const userId = getUserId(request);
        console.log("postId", args.id);
        console.log("userId", userId)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        const isPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        })

        if (!postExists) {
            throw new Error('Unable to update post')
        }
        if (isPublished && args.data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            })
        }
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)


    },
    async createComment(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);
        // console.log(args.comment.post);
        const postExists = await prisma.exists.Post({
            id: args.comment.post,
            published: true
        });
        if (!postExists) {
            throw new Error("unable to find post")
        }
        return prisma.mutation.createComment({
            data: {
                text: args.comment.text,
                author: {
                    connect: {
                        id: userId
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
        prisma,
        request
    }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Unable to delete comment')
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)


    },
    async updateComment(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Unable to update comment')
        }
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