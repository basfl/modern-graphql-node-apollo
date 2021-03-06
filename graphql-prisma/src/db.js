const users = [{
    id: "123",
    name: "testUser",
    email: "testUser@test.com"
},
{
    id: "456",
    name: "amir",
    email: "amir@test.com",
    age: 32
},
{
    id: "789",
    name: "parisa",
    email: "parisa@test.com",
    age: 30
}

]; 
const posts = [{
    id: "cvb",
    title: "post titile1",
    body: "Awsome post",
    published: true,
    author: "123"
},
{
    id: "123",
    title: "post titile2",
    body: "good post",
    published: true,
    author: "456"
},
{
    id: "123123",
    title: "post titile4",
    body: "very good post",
    published: true,
    author: "456"
},
{
    id: "456",
    title: "post titile3",
    body: "bad post",
    published: true,
    author: "789"
}

];

const comments = [{
    id: "123",
    text: "comments1",
    author: "456",
    post: "123" 

},
{
    id: "456",
    text: "comments2",
    author: "456",
    post: "123"

},
{
    id: "789",
    text: "comments3",
    author: "123",
    post: "123123"

},
{
    id: "10",
    text: "comments4",
    author: "789",
    post: "456"

}
];

const db = {
    users,
    posts,
    comments
}
export { db as default }