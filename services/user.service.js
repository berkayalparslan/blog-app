const userRepository = require('../repositories/user.repository.js');
const User = require('../models/user.js');

const getAll = async () => {
    const users = await userRepository.getAll();
    return users.map(user => new User(user));
}

const getById = async (id) => {
    const user = await userRepository.getById(id);
    return user ? new User(user) : null;
}

const create = async ({ name, email, password }) => {
    const newUser = new User({
        name: name,
        email: email,
        password: password,
        createdDate: new Date()
      });
    const existingUser = (await userRepository.getAll()).find(user => user.email === email);
    if (existingUser) {
        return null;
    }
    return await userRepository.create(newUser);
}

const updateEmail = async (id, {email}) => {
    return await userRepository.update(id, {email});
}

const remove = async (id) => {
    return await userRepository.remove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    updateEmail,
    remove
}

