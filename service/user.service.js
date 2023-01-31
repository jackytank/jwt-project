//@ts-check
const userData = require('../mock-db/users.json');

module.exports = new class UserService {
    async getAll() {
        return userData;
    };

    async verifyConfidential(username, password) {
        const foundUser = userData.find((user) => user.username === username && user.password === password);
        if (!foundUser) {
            return null;
        }
        return foundUser;
    }
};
