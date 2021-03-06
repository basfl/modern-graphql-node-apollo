import myCurrectnLocation, {
    message,
    getGreeting
} from './myModule';

import add, {
    subtract
} from './math';

console.log(message);
console.log(myCurrectnLocation);
console.log(getGreeting(myCurrectnLocation));
console.log("------------------------");
console.log(add(2, 3));
console.log(subtract(5, 3));