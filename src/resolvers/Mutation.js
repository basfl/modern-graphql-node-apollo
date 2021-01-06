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
    updateUser(parent, args, {
        db
    }, info) {

        const {
            id,
            data
        } = args;

        const user = db.users.find(user => user.id === id);
        if (!user) {
            throw new Error("No user found!");
        }
        if (typeof data.email === 'string') {
            const emailTaken = db.users.some(user => user.email = data.email);
            if (emailTaken) {
                throw new Error("Email taken!");
            }
            user.email = data.email;
        }
        if (typeof data.age !== "undefined") {
            user.age = data.age;
        }

        if (typeof data.name === "string") {
            user.name = data.name;
        }
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
    updatePost(parent, args, {
        db
    }, info) {

        const {
            id,
            data
        } = args;
        const updatedPost = db.posts.find(post => post.id === id);
        if (!updatedPost) {
            throw new Error("Post not found!!");
        }
        if (typeof data.title === "string") {
            updatedPost.title = data.title;
        }
        if (typeof data.body === "string") {
            updatedPost.body = data.body;
        }
        if (typeof data.published === "boolean") {
            updatedPost.published = data.published;
        }

        return updatedPost;

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
            throw new Error(" No comment found");
        }
        const deleteComment = db.comments.splice(commentIndex, 1);
        return deleteComment[0];

    },
    updateComment(parent,args,{db},info){
        const {id,data}=args;
        const updatedComment=db.comments.find(comment=>comment.id===id);
        if(!updatedComment){
            throw new Error("No comment found");
        }
        if(typeof data.text==="string"){
            updatedComment.text=data.text; 
        }
        return updatedComment;
    }
}

export {
    Mutation as
    default
}