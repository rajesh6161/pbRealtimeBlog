import PocketBase from 'pocketbase';
const client = new PocketBase('http://127.0.0.1:8090');

export const login = async ({ email, password }, callback) => {
  try {
    const user = await client.users.authViaEmail(email, password);
    client.authStore.exportToCookie(user);
    callback({
      type: 'loginSuccess',
      message: user,
    });
  } catch (error) {
    callback({
      type: 'error',
      message: error.data.message,
    });
  }
};

export const createUser = async (
  { email, password, passwordConfirm },
  callback
) => {
  try {
    await client.users.create({
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    });
    callback({
      type: 'regSuccess',
      message: 'Registration successful. Please login.',
    });
  } catch (error) {
    let err = error.data.data;
    if (err.email) {
      callback({
        type: 'error',
        message: err.email.message,
      });
    } else if (err.passwordConfirm) {
      callback({
        type: 'regError',
        message: err.passwordConfirm.message,
      });
    } else {
      callback('Something went wrong!');
    }

    console.log('error in createUser', error.data);
  }
};

export const logout = () => {
  client.authStore.clear();
  window.location.reload();
};

export const createPost = async (data, callback) => {
  try {
    const record = await client.records.create('posts', data);
    console.log(record);
  } catch (error) {
    console.log('error in createPost', error.data);
  }
};

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
