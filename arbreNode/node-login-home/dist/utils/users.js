import bcrypt from 'bcryptjs';
const users = [];
export function createUser(username, password) {
    const passwordHash = bcrypt.hashSync(password, 8);
    const user = { id: users.length + 1, username, passwordHash };
    users.push(user);
    return user;
}
export function findUserByUsername(username) {
    return users.find(u => u.username === username);
}
export function verifyPassword(user, password) {
    return bcrypt.compareSync(password, user.passwordHash);
}
