import {
    Prisma
} from 'prisma-binding';


const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: "http://192.168.99.100:4466/",



});

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// });

console.log("______________________");
console.log("______________________");

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

prisma.mutation.updatePost({
        where: {
            id: "ckjs1bwdo000u07167rpkwhtm"
        },
        data: {
            published: true
        }
    },
    "{ id title }").then(data => {
    return prisma.query.posts(null, "{  id body published  }");
}).then(data => {
    console.log("user:", JSON.stringify(data, undefined, 2));
}).catch(err => {
    console.log(err);
})
//export { prisma as default }