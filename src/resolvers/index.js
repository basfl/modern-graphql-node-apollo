import {extractFragmentReplacements} from "prisma-binding";
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User'
import Post from './Post'
import Comment from './Comment'



const resolvers = {
    Query,
    Mutation,
    Subscription,
    Post,
    User,
    Comment
}

const fragmentReplacements=new extractFragmentReplacements(resolvers);

console.log(fragmentReplacements);

export {
    resolvers,
    fragmentReplacements
}