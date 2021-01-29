import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga';

import {
    resolvers,
    fragmentReplacements
} from "./resolvers/index"
import db from './db';
import prisma from './prisma';

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context(request) {
        return ({
            db,
            pubsub,
            prisma,
            request

        });

    },
    fragmentReplacements
});


<<<<<<< HEAD
server.start({
    port: process.env.PORT || 4000
}, () => {
    console.log("server is running ...");
=======
server.start(() => {
    console.log("server is running ...");  
>>>>>>> stable-prod1
});