### Query
 * query {
  posts{id,title,
    author
    {id,name
    }}
}
 * query {
  post(authID:"123"){
    body
  }
}


### Mutations
 * 
    mutation {
  createUser(data:{
    name:"ben",
    email:"ben@ben.com",
    age:5
  }){
    id
    name
    email
    age
  }
}

* 
mutation {
  createPost(
    post:{
    title:"new title",
    body:"new body",
    published:true,
    author:"ef2e4a62-8fa6-4e0a-8ef0-7d0557848e44"
    }
   ){
    id
    title
    author{
      name
    }
  }
}

* 
mutation {
  createComment(
    comment:{
    text:"new text",
    author:"ef2e4a62-8fa6-4e0a-8ef0-7d0557848e44",
    post:"1325ab1b-5f3f-46b6-a15f-0a59bfbca719"
    }
   ){
    id
    text
  }
}

#### subscription

  * 
  subscription {
  comment(postId:"123"){
    id
    text
    author{
      id
      name
    }
  }
}