import { useEffect, useState } from 'react';
import MainScreen from './components/MainScreen';
import CreatePost from './components/post/CreatePost';
import AuthPage from './components/auth/AuthPage';
import { useSelector } from 'react-redux';
import { RecordModel } from 'pocketbase';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './utils/config';
import { RootState } from './store';

export interface Post extends RecordModel {
  title: string;
  content: string;
  imgurl?: string;
  user: string;
  updated: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPost, setShowPost] = useState<boolean>(false);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

  const { user, loggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    client.collection('posts').subscribe('*', function (e: {
      action: string;
      record: Post;
    }) {
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
      client.collection('posts').unsubscribe();
    };
  });

  if (!loggedIn || !user) {
    return (
      <div className="flex flex-col h-screen">
        <ToastContainer />
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      {!showCreatePost ? (
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
