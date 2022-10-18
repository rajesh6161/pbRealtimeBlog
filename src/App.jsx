import { useEffect, useState } from 'react';
import MainScreen from './components/MainScreen';
import CreatePost from './components/post/CreatePost';
import AuthPage from './components/auth/AuthPage';
import { useSelector } from 'react-redux';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './utils/config';

function App() {
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

  const { user, loggedIn } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      {!loggedIn ? (
        <AuthPage />
      ) : !showCreatePost ? (
        <MainScreen
          setShowCreatePost={setShowCreatePost}
          showCreatePost={showCreatePost}
          loggedIn={loggedIn}
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
          loggedIn={loggedIn}
          user={user}
        />
      )}
    </div>
  );
}

export default App;
