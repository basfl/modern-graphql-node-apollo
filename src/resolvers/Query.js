const Query = {

    me() {

        return {
            id: "abc123",
            name: "testuser",
            email: "test@gmail.com"
        }

    },

    users(paranet, args, {
        db,
        prisma
    }, info) {
        const opArgs = {};
        if (args.q != null) {
            opArgs.where = {
                OR: [{
                    name_contains: args.q
                }, {
                    email_contains: args.q
                }]

            }
        }
        return prisma.query.users(opArgs, info);

    },

    post(paranet, args, {
        prisma
    }, info) {

        return prisma.query.post(null, info);

        // if (!args.authID) {
        //     return {
        //         id: null,
        //         title: null,
        //         body: null,
        //         published: null,

        //     };

        // }

        // return db.posts.find((post) => {
        //     return post.author.toLowerCase().includes(args.authID.toLowerCase());

        // })

    },

    posts(parent, args, {
        prisma
    }, info) {
        const opArgs = {};
        if (opArgs != null) {
            opArgs.where = {
                OR: [{
                        body_contains: args.q
                    },
                    {
                        title_contains: args.q
                    }

                ]
            }
        }
        return prisma.query.posts(opArgs, info);
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

        return prisma.query.comments(null,info);
        // return db.comments;

    }

}

export {
    Query as
    default
}