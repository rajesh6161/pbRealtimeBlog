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

const postService = {
  getPosts,
  createPost,
};

export default postService;
