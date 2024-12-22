import { client } from './config';
import { Post } from '../App';

interface CallbackData {
  type: 'success' | 'error';
  data: Post[];
}

type CallbackFunction = (data: CallbackData) => void;

export const getPosts = async (callback: CallbackFunction): Promise<void> => {
  try {
    const records = await client.collection('posts').getFullList({
      sort: '-created',
      batch: 20
    });
    callback({
      type: 'success',
      data: records as Post[],
    });
  } catch (error) {
    console.log('Error while getting posts', error);
    callback({
      type: 'error',
      data: [],
    });
  }
};

export const likePost = async (
  recId: string, 
  data: Record<string, any>, 
  callback?: (record: Post) => void
): Promise<void> => {
  try {
    const record = await client.collection('posts').update(recId, data);
    console.log(record);
    if (callback) {
      callback(record as Post);
    }
  } catch (error) {
    console.log('error while updating', error);
  }
};
