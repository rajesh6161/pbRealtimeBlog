import { client } from '../../utils/config';
import { RecordModel } from 'pocketbase';

interface PostData {
  title: string;
  content: string;
  imgurl?: string;
  user?: string;
  likes?: any;
  //[key: string]: any;
  
}

interface EditPostData extends PostData {
  post_id: string;
}

const getPosts = async (): Promise<RecordModel[]> => {
  const res = await client.collection('posts').getFullList({
    sort: '-created',
    batch: 20
  });
  return res;
};

const createPost = async (data: PostData): Promise<void> => {
  await client.collection('posts').create(data);
};

const editPost = async (data: EditPostData): Promise<RecordModel> => {
  const defaultImg =
    'https://images.freeimages.com/images/large-previews/bee/omniety-1535599.jpg';
  const updateData: PostData = {
    title: data.title,
    content: data.content,
    imgurl: data.imgurl || defaultImg,
  };
  const record = await client.collection('posts').update(data.post_id, updateData);
  return record;
};

const likePost = async (recId: string, data: Record<string, any>): Promise<void> => {
  await client.collection('posts').update(recId, data);
};

const deletePost = async (recId: string): Promise<void> => {
  await client.collection('posts').delete(recId);
};

const postService = {
  getPosts,
  createPost,
  editPost,
  likePost,
  deletePost,
};

export type { PostData, EditPostData };
export default postService;
