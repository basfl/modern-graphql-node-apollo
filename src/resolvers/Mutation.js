import {
    v4 as uuidv4
} from 'uuid';
const Mutation = {

    createUser(parent, args, {
        db
    }, info) {

        const emailTaken = db.users.some(user => user.email === args.data.email);
        if (emailTaken) {
            throw new Error("Email taken");
        }

        const user = {
            id: uuidv4(),
            ...args.data

        }
        db.users.push(user);
        return user;


    },
    deleteUser(parent, args, {
        db
    }, info) {

        const userIndex = db.users.findIndex((user) => user.id === args.id)
        if (userIndex === -1) {
            throw new Error("user not found");
        }
        const deletedUser = users.splice(userIndex, 1);
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id;

            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match;
        });
        db.comments = db.comments.filter((comment) => comment.author !== args.id)
        return deletedUser[0];
    },
    createPost(parent, args, {
        db
    }, info) {

        const userExist = db.users.some(user => user.id === args.post.author);
        if (!userExist) {
            throw new Error("User not found");
        }

        const post = {
            id: uuidv4(),
            ...args.post


        };
        db.posts.push(post);
        return post;

    },
    deletePost(parent, args, {
        db
    }, info) {

        const postIndex = db.posts.findIndex(post => post.id === args.id);
        if (postIndex === -1) {
            throw new Error("Post not found");
        }
        const deletedPost = db.posts.splice(postIndex, 1);
        db.comments = db.comments.filter((comment) => {
            comment.post != args.id;
        });

        return deletedPost[0];


    },

    createComment(parent, args, {
        db
    }, info) {

        const userExist = db.users.some(user => user.id === args.comment.author);
        if (!userExist) {
            throw new Error("User not found");
        }
        const postExist = db.posts.some(post => post.id === args.comment.post && post.published);
        if (!postExist) {
            throw new Error("post not found");
        }

        const comment = {
            id: uuidv4(),
            ...args.comment

        };
        db.comments.push(comment);
        return comment;


    },
    deleteComment(parent, args, {
        db
    }, info) {

        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
        if (commentIndex === -1) {
            throw new Error(" no comment found");
        }
        const deleteComment = db.comments.splice(commentIndex, 1);
        return deleteComment[0];

    }
}

export {
    Mutation as
    default
}