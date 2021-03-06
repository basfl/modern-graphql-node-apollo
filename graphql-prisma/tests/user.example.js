import {
    getFirstName,
    isValidPassword
} from '../src/utils/user'

test("Should return first name when given full name", () => {

    const firstName = getFirstName("john doe");
    expect(firstName).toBe("john");


});

test("Should return first name when given first name", () => {

    const firstName = getFirstName("john");
    expect(firstName).toBe("john");


});


test("Should reject passwrd shorter than 8 characters", () => {

    const isValid = isValidPassword("qaz");
    expect(isValid).toBe(false);

});

test("Should reject passwrd that contains word password", () => {

    const isValid = isValidPassword("password");
    expect(isValid).toBe(false);

});


test("Should correctly validate the password", () => {

    const isValid = isValidPassword("qazwsxedc");
    expect(isValid).toBe(true);

});