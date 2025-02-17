const Post = require('../models/post');

const getAll = async () => {
    return await Post.find();
}

const getById = async (id) => {
    return await Post.findOne(id);
}

const create = async (post) => {
    return await post.save(post);
}

const update = async (id, post) => {
    return await Post.findByIdAndUpdate(id, post, { new: true });
}

const remove = async (id) => {
    return await Post.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};