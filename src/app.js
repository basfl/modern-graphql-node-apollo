import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import db from './db';

const pubsub=new PubSub();
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Post,
        User,
        Comment
    },
    context: {
        db,
        pubsub
    }
});


server.start(() => {
    console.log("server is running ...");
});