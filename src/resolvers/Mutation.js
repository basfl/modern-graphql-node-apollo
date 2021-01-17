import {
    v4 as uuidv4
} from 'uuid';
const Mutation = {

    async createUser(parent, args, {
        prisma
    }, info) {
        const emailTaken = await prisma.exists.User({
            email: args.data.email
        });
        if (emailTaken) {
            throw new Error("Email taken");
        }
        const user = await prisma.mutation.createUser({
            data: args.data
        }, info);
        return user;


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
    deletePost(parent, args, {
        db,
        pubsub
    }, info) {

        const postIndex = db.posts.findIndex(post => post.id === args.id);
        if (postIndex === -1) {
            throw new Error("Post not found");
        }
        const [post] = db.posts.splice(postIndex, 1);
        db.comments = db.comments.filter((comment) => {
            comment.post != args.id;
        });

        if (post.published) {

            pubsub.publish("post", {
                post: {
                    mutation: "DELETED",
                    data: post
                }
            })

        }

        return post;


    },
    updatePost(parent, args, {
        db,
        pubsub
    }, info) {
        const {
            id,
            data
        } = args
        const post = db.posts.find((post) => post.id === id)
        const originalPost = {
            ...post
        }

        if (!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published

            if (originalPost.published && !post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            } else if (!originalPost.published && post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
        } else if (post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }

        return post
    },
    createComment(parent, args, {
        db,
        pubsub
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
        pubsub.publish(`comment ${args.comment.post}`, {
            comment: {
                mutation: "CREATED",
                data: comment
            }
        })
        return comment;


    },
    deleteComment(parent, args, {
        db,
        pubsub
    }, info) {

        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
        if (commentIndex === -1) {
            throw new Error(" No comment found");
        }
        const [deletedComment] = db.comments.splice(commentIndex, 1);

        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: "DELETED",
                data: deletedComment
            }
        })

        return deletedComment;

    },
    updateComment(parent, args, {
        db,
        pubsub
    }, info) {
        const {
            id,
            data
        } = args;
        const updatedComment = db.comments.find(comment => comment.id === id);
        if (!updatedComment) {
            throw new Error("No comment found");
        }
        if (typeof data.text === "string") {
            updatedComment.text = data.text;
        }
        pubsub.publish(`comment ${updatedComment.post}`, {
            comment: {
                mutation: "UPDATED",
                data: updatedComment
            }
        })
        return updatedComment;
    }
}

export {
    Mutation as
    default
}