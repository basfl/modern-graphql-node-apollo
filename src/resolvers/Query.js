import getUserId from '../utils/getUserId';
const Query = {

    async me(paranet, args, {
        prisma,
        request
    }, info) {

        const userId = getUserId(request);
        return prisma.query.user({
            where: {
                id: userId
            }
        }, info);

    },

    users(paranet, args, {
        db,
        prisma
    }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        };
        if (args.q != null) {
            opArgs.where = {
                OR: [{
                    name_contains: args.q
                }]

            }
        }
        return prisma.query.users(opArgs, info);

    },

    async post(paranet, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request, false);
        const posts = await prisma.query.posts({
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if (posts.length === 0) {
            throw new Error('Post not found')
        }

        return posts[0]
    },
    myPosts(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                author: {
                    id: userId
                }
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },

    posts(parent, args, {
        prisma
    }, info) {

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
        // const opArgs = {};
        // if (opArgs != null) {
        //     opArgs.where = {
        //         OR: [{
        //                 body_contains: args.q
        //             },
        //             {
        //                 title_contains: args.q
        //             }

        //         ]
        //     }
        // }
        // return prisma.query.posts(opArgs, info);
        // if (!args.q) {
        //     return db.posts;
        // }
        // return db.posts.filter((post) => {
        //     return post.title.toLowerCase().includes(args.q.toLowerCase()) ||
        //         post.body.toLowerCase().includes(args.q.toLowerCase());
        // })
    },

    comments(parent, args, {
        prisma
    }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        return prisma.query.comments(opArgs, info);
        // return db.comments;

    }

}

export {
    Query as
    default
}