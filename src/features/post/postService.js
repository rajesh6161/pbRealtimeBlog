import { client } from '../../utils/config';

const getPosts = async () => {
  const res = await client.records.getFullList('posts', 20, {
    sort: '-created',
  });
  return res;
};

const createPost = async (data) => {
  await client.records.create('posts', data);
};

const editPost = async (data) => {
  const defaultImg =
    'https://images.freeimages.com/images/large-previews/bee/omniety-1535599.jpg';
  let d = {
    title: data.title,
    content: data.content,
    imgurl: data.imgurl || defaultImg,
  };
  const record = await client.records.update('posts', data.post_id, d);
  return record;
};

const likePost = async (recId, data) => {
  await client.records.update('posts', recId, data);
};

const deletePost = async (recId) => {
  await client.records.delete('posts', recId);
};

const postService = {
  getPosts,
  createPost,
  editPost,
  likePost,
  deletePost,
};

export default postService;
