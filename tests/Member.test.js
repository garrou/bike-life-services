const Member = require('../models/Member');
const Utils = require('../utils/Utils');

let member;

beforeEach(() => {
    member = new Member(Utils.uuid(), '   test@gmail.com   ', ' testtest12   ', true);
});

test('Check member fields', () => {
    expect(member.email).toBe('test@gmail.com');
    expect(member.password).toBe('testtest12');
});

test('Check if member is valid with valid fields', () => {
    expect(member.isValid()).toBe(true);
});

test('Check if member is valid with invalid email', () => {
   member.email = 'this_is_a_test';
   expect(member.isValid()).toBe(false);
});