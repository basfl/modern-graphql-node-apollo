import {
    Prisma
} from 'prisma-binding';

import {
    fragmentReplacements
} from './resolvers/index';


const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: "http://192.168.99.100:4466/",
    secret: "thisismysupersecrettext",
    fragmentReplacements
});


// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// });

// console.log("______________________");
// console.log("______________________");


// prisma.exists.Comment({
//     id: "ckjre2l8l005q0751qumql3im"
// }).then(exists => {
//     console.log("comment ", exists);
// });

// prisma.query.comments(null, `{

//       id
//       text
//       author{
//         id
//         name
//       }

//     }`).then(data => {
//     console.log("comment:", JSON.stringify(data, undefined, 2));
// });

// prisma.mutation.createPost({
//     data: {
//         title: "second post from nodejs app",
//         body: "second content from nodejs app",
//         published: false,
//         author: {
//             connect: {
//                 id: "ckjrdw6xf005j0751hoapkb8j"
//             }

//         }
//     }


// }, "{ id title body published }").then(data => {
//     console.log("comment:", JSON.stringify(data, undefined, 2));
//     return prisma.query.users(null, '{ id name posts { id title } }');
// }).then(data => {
//     console.log("user:", JSON.stringify(data, undefined, 2));
// })

//////////////////////////////

// prisma.mutation.updatePost({
//         where: {
//             id: "ckjs1bwdo000u07167rpkwhtm"
//         },
//         data: {
//             published: true
//         }
//     },
//     "{ id title }").then(data => {
//     return prisma.query.posts(null, "{  id body published  }");
// }).then(data => {
//     console.log("user:", JSON.stringify(data, undefined, 2));
// }).catch(err => {
//     console.log(err);
// })

/////////////////////////////////////////////////////
//////  ######################////////////////////////

// const createPostForUser = async (authorId, data) => {

//     const userExist = await prisma.exists.User({
//         id: authorId
//     });
//     if (!userExist) {

//         throw new Error("User not found!");

//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }

//             }
//         }
//     }, "{ id body  author {id name email posts {id body published}} }");

// const user = prisma.query.user({
//     where: {
//         id: authorId
//     }
// }, "{ id name email posts {id body published} }");
// return user;

//     return post.author;

// }

// const inpuData = {
//     title: "create new async post for user at " + Date.now(),
//     body: "this is asunc post for user created at " + Date.now(),
//     published: true,
// }

// createPostForUser("ckjrc1tws001d075108uga6xk", inpuData).then(user => {
//     console.log("what happend!!")
//     console.log(user);
// }).catch(err => {
//     console.log(err);
// });

/////////////////////////////////////////////////////
//////  ######################////////////////////////
// const updatePostForUser = async (postId, data) => {

//     const postExist = await prisma.exists.Post({
//         id: postId
//     });

//     if (!postExist) {
//         throw new Error("Sorry post does not exist");
//     }

//     const post = await prisma.mutation.updatePost({
//         data,
//         where: {
//             id: postId
//         }

//     }, "{id body author {id name email posts {id body published}} }");


//     return post.author;

// }

// const updatePostInputData = {
//     body: `some awsome post add at ${Date.now()}!!`
// }


// updatePostForUser("ckjrdc3i6003w0751uy9v2rxc", updatePostInputData).then(author => {
//     console.log("author ", author);

// }).catch(err => {
//     console.log(err);
// })


export {
    prisma as
    default
}