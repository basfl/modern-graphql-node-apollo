const Query  = {

    me() {

        return {
            id: "abc123",
            name: "testuser",
            email: "test@gmail.com"
        }

    },

    users(paranet, args, {
        db
    }, info) {
        if (!args.q) {
            return db.users;
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.q.toLowerCase());
        })

    },

    post(paranet, args, {
        db
    }, info) {

        if (!args.authID) {
            return {
                id: null,
                title: null,
                body: null,
                published: null,

            };

        }

        return db.posts.find((post) => {
            return post.author.toLowerCase().includes(args.authID.toLowerCase());

        })

    },

    posts(parent, args, {
        db
    }, info) {
        if (!args.q) {
            return db.posts;
        }
        return db.posts.filter((post) => {
            return post.title.toLowerCase().includes(args.q.toLowerCase()) ||
                post.body.toLowerCase().includes(args.q.toLowerCase());
        })
    },

    comments(parent, args, {
        db
    }, info) {

        return db.comments;

    }

}

export { Query as default }