const message = "Graphql is working ... ";
const location = "WV";

const getGreeting = (location) => {
    return `welcome from ${location} `;
}

export {
    message,
    getGreeting,
    location as
    default
}