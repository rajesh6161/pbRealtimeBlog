import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import MainScreen from './components/MainScreen';
import CreatePost from './components/CreatePost';
import AuthPage from './components/AuthPage';

function App() {
  const client = new PocketBase('http://127.0.0.1:8090');

  const [posts, setPosts] = useState([]);
  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    client.realtime.subscribe('posts', function (e) {
      if (e.action === 'delete') {
        setPosts(
          posts.filter((post) => {
            return post.id !== e.record.id;
          })
        );
        return;
      }

      if (e.action === 'update') {
        setPosts(
          posts.map((post) => {
            if (post.id === e.record.id) {
              return e.record;
            }
            return post;
          })
        );
        return;
      }
      setPosts((prev) => [e.record, ...prev]);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [authState, setAuthState] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
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
          posts={posts}
          setPosts={setPosts}
          showPost={showPost}
          setShowPost={setShowPost}
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
