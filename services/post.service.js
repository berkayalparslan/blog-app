const postRepository = require('../repositories/post.repository.js');
const Post = require('../models/post.js');

const getAll = async () => {
    const posts = await postRepository.getAll();
    return posts.map(post => new Post(post));
}

const getById = async (id) => {
    const post = await postRepository.getById(id);
    return post ? new Post(post) : null;
}

const create = async ({ title, content }) => {
    const newPost = new Post({
        title: title,
        content: content,
        createdDate: new Date()
      });
    return await postRepository.create(newPost);
}

const update = async (id, { title, content }) => {
    return await postRepository.update(id, { title, content });
}

const remove = async (id) => {
    return await postRepository.remove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}

