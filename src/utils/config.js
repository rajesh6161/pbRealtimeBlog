import Pocketbase from 'pocketbase';

const url = 'http://127.0.0.1:8090';
const client = new Pocketbase(url);

export { client };
