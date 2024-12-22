import PocketBase from 'pocketbase';

//const url = 'https://abiding-sundown.pockethost.io';
const url: string = 'http://127.0.0.1:8090';
const client: PocketBase = new PocketBase(url);

export { client };
