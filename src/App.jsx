import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import MainScreen from './components/MainScreen';
import CreatePost from './components/CreatePost';
import AuthPage from './components/AuthPage';

function App() {
  const client = new PocketBase('http://127.0.0.1:8090');
  // realtime db
  const [realtimeWord, setRealtimeWord] = useState('');
  const [recordId, setRecordId] = useState('');

  const updateWord = async (rec_id, letter) => {
    try {
      await client.records.update('wordle', rec_id, {
        word: letter,
      });
    } catch (error) {
      console.log('Error occurred while updating the todo', error);
    }
  };

  const initWord = async () => {
    try {
      let word = await client.records.getFullList('wordle', 1, {
        sort: '-created',
      });
      if (word.length === 0) {
        await client.records.create('wordle', {
          word: '',
        });
        let w = await client.records.getFullList('wordle', 1, {
          sort: '-created',
        });
        setRecordId(w[0].id);
      } else {
        setRecordId(word[0].id);
      }
    } catch (error) {
      console.log('Error occurred while getting word', error.data);
    }
  };
  console.log(recordId);
  useEffect(() => {
    client.realtime.subscribe('wordle', function (e) {
      console.log('realtime', e.record);
      setRealtimeWord(e.record);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [authState, setAuthState] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // initWord();
    let pocketbase_auth = localStorage.getItem('pocketbase_auth');
    pocketbase_auth = JSON.parse(pocketbase_auth);
    if (pocketbase_auth?.token?.length > 0) {
      setAuthState(true);
      setUser(pocketbase_auth.model);
    }
  }, [authState]);

  return (
    <div className="flex flex-col h-screen">
      {!authState ? (
        <AuthPage setAuthState={setAuthState} setUser={setUser} />
      ) : !showCreatePost ? (
        <MainScreen
          setShowCreatePost={setShowCreatePost}
          showCreatePost={showCreatePost}
          authState={authState}
          user={user}
        />
      ) : (
        <CreatePost
          setShowCreatePost={setShowCreatePost}
          showCreatePost={showCreatePost}
          authState={authState}
          user={user}
        />
      )}
    </div>
  );
}

export default App;
