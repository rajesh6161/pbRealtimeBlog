import { client } from './config';

export const getPosts = async (callback) => {
  try {
    const records = await client.records.getFullList('posts', 20, {
      sort: '-created',
    });
    callback({
      type: 'success',
      data: records,
    });
  } catch (error) {
    console.log('Error while getting posts', error.data);
  }
};

export const likePost = async (recId, data, callback) => {
  try {
    const record = await client.records.update('posts', recId, data);
    console.log(record);
  } catch (error) {
    console.log('error while updating', error.data);
  }
};
