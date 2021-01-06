import {
    GraphQLServer
} from 'graphql-yoga';

import {
    usersDemo
} from './array-data/users';
import {
    postsDemo
} from './array-data/posts';
import {
    commentsDemo
} from './array-data/comments';

import {
    v4 as uuidv4
} from 'uuid';

/////////////////////////////////////////

// let commentsDemo = [{
//         id: "123",
//         text: "comments1",
//         author: "456",
//         post: "123"

//     },
//     {
//         id: "456",
//         text: "comments2",
//         author: "456",
//         post: "123"

//     },
//     {
//         id: "789",
//         text: "comments3",
//         author: "123",
//         post: "123123"

//     },
//     {
//         id: "10",
//         text: "comments4",
//         author: "789",
//         post: "456"

//     }
// ];


///////////////////////////////////////////

// type defination (schema)
const typeDefs = `
type Query {
 
  users(q:String):[User!]!  
  me:User!
  post(authID:String):Post!
  posts(q:String):[Post!]!
  comments:[Comment]!
   
}
type Mutation {
    createUser(data:createUserInput!):User!
    deleteUser(id:ID!):User!
    createPost(post:createPostInput!):Post!
    createComment(comment:createCommentInput!):Comment!
    
}

input createUserInput {
    name:String!
    email:String!
    age:Int

}

input createPostInput {
    title:String!
    body:String!
    published:Boolean!
    author:ID!

}

input createCommentInput {
    text:String!
    author:ID!
    post:ID!

}


type User {
    id:ID!
    name:String!
    email:String!
    age:Int
    posts:[Post!]!
    comments:[Comment!]!
}
type Post {
    id:ID!
    title:String!
    body:String!
    published:Boolean!
    author:User!
    comments:[Comment!]!
}

type Comment {
    id:ID!
    text:String!
    author:User!
    post:Post!
}
`

//resolver
const resolvers = {
    Query: {

        me() {

            return {
                id: "abc123",
                name: "babak",
                email: "test@gmail.com"
            }

        },

        users(paranet, args, cntx, info) {
            if (!args.q) {
                return usersDemo;
            }
            return usersDemo.filter((user) => {
                return user.name.toLowerCase().includes(args.q.toLowerCase());
            })

        },

        post(paranet, args, cntx, info) {

            if (!args.authID) {
                return {
                    id: null,
                    title: null,
                    body: null,
                    published: null,

                };

            }

            return postsDemo.find((post) => {
                return post.author.toLowerCase().includes(args.authID.toLowerCase());

            })

        },

        posts(parent, args, cntx, info) {
            if (!args.q) {
                return postsDemo;
            }
            return postsDemo.filter((post) => {
                return post.title.toLowerCase().includes(args.q.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.q.toLowerCase());
            })
        },

        comments(parent, args, ctx, info) {

            return commentsDemo;

        }

    },
    Mutation: {

        createUser(parent, args, cntx, info) {

            const emailTaken = usersDemo.some(user => user.email === args.data.email);
            if (emailTaken) {
                throw new Error("Email taken");
            }

            const user = {
                id: uuidv4(),
                ...args.data

            }
            usersDemo.push(user);
            return user;


        },
        deleteUser(parent, args, cntx, info) {
            
            const userIndex = usersDemo.findIndex((user) => user.id === args.id)
            if (userIndex === -1) {
                throw new Error("user not found");
            }
            const deletedUser = usersDemo.splice(userIndex, 1);
            postsDemo.filter((post) => {
                const match = post.author === args.id;

                if (match) {
                     commentsDemo.filter((comment) => comment.post !== post.id)
                }

                return !match;
            });
             commentsDemo.filter((comment) => comment.author !== args.id)
            return deletedUser[0];
        },
        createPost(parent, args, cntx, info) {

            const userExist = usersDemo.some(user => user.id === args.post.author);
            if (!userExist) {
                throw new Error("User not found");
            }

            const post = {
                id: uuidv4(),
                ...args.post


            };
            postsDemo.push(post);
            return post;

        },

        createComment(parent, args, cntx, info) {

            const userExist = usersDemo.some(user => user.id === args.comment.author);
            if (!userExist) {
                throw new Error("User not found");
            }
            const postExist = postsDemo.some(post => post.id === args.comment.post && post.published);
            if (!postExist) {
                throw new Error("post not found");
            }

            const comment = {
                id: uuidv4(),
                ...args.comment

            };
            commentsDemo.push(comment);
            return comment;


        }
    },
    Post: {
        author(parent, args, cntx, info) {
            return usersDemo.find((user) => {
                return user.id === parent.author;

            });

        },
        comments(parent, args, cntx, info) {
            return commentsDemo.filter(comment => {
                return comment.post === parent.id;
            })

        }

    },
    User: {
        posts(parent, args, cntx, info) {
            return postsDemo.filter((post) => {
                return post.author === parent.id;
            })
        },
        comments(parent, args, cntx, info) {
            return commentsDemo.filter(comment => {
                return comment.author === parent.id;
            })
        }
    },

    Comment: {
        author(parent, args, cntx, info) {
            return usersDemo.find(user => {
                return user.id === parent.author;
            })
        },
        post(parent, args, cntx, info) {

            return postsDemo.find(post => {
                return post.id === parent.post;
            })

        }
    }
}

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.start(() => {
    console.log("server is running ...");
})