const User = require('../models/user');

const getAll = async () => {
    return await User.find();
}

const getById = async (id) => {
    return await User.findOne(id);
}

const create = async (user) => {
    
    return await user.save(user);
}

const update = async (id, user) => {
    return await User.findByIdAndUpdate(id, user, { new: true });
}

const remove = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};