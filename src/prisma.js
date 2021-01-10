import {
    Prisma
} from 'prisma-binding';

const primse = Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: "http://192.168.99.100:4466/"

});