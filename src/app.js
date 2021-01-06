import {
    GraphQLServer
} from 'graphql-yoga';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import db from './db';

//resolver
const resolvers = {
    Query,
    Mutation,
    Post,
    User,
    Comment
};

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: resolvers,
    context: {
        db
    }
})


server.start(() => {
    console.log("server is running ...");
})