import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Post from './post/Post';
import { getPosts } from '../utils/apis';
import PostPage from './post/PostPage';
import { User } from '../features/auth/authService';
import { Post as PostType } from '../App';

interface MainScreenProps {
  setShowCreatePost: (show: boolean) => void;
  showCreatePost: boolean;
  loggedIn: boolean;
  user: User;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  setShowPost: (show: boolean) => void;
  showPost: boolean;
}

interface CallbackData {
  type: string;
  data: PostType[];
}

const MainScreen: React.FC<MainScreenProps> = ({
  setShowCreatePost,
  showCreatePost,
  loggedIn,
  user,
  posts,
  setPosts,
  setShowPost,
  showPost,
}) => {
  const [currentPost, setCurrentPost] = useState<PostType>({
    id: '',
    collectionId: '',
    collectionName: '',
    created: '',
    updated: '',
    title: '',
    content: '',
    user: '',
    imgurl: ''
  });

  const callback = ({ type, data }: CallbackData) => {
    if (type === 'success' && data.length > 0) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts(callback);
  }, []);

  return (
    <>
      <Navbar
        setShowCreatePost={setShowCreatePost}
        showCreatePost={showCreatePost}
        loggedIn={loggedIn}
        user={user}
        setShowPost={setShowPost}
        showPost={showPost}
      />
      {!showPost ? (
        <div className="flex flex-col justify-center items-center mx-5 relative">
          <div className="py-10 space-y-3 md:w-[500px] text-center">
            <h1 className="text-5xl font-bold">Realtime Blog</h1>
            <p className="text-lg text-gray-600">
              <q>
                Be who you are and say what you feel, because those who mind
                don't matter, and those who matter don't mind.
              </q>
            </p>
          </div>
          {posts.length > 0 ? (
            <div className="md:columns-2 md:gap-5 gap-0 columns-1">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  setShowPost={setShowPost}
                  setCurrentPost={setCurrentPost}
                />
              ))}
            </div>
          ) : (
            <p className="text-2xl text-gray-500">
              🤔 No posts yet. Create one by clicking on the button below.
            </p>
          )}
        </div>
      ) : (
        <PostPage
          setShowPost={setShowPost}
          currentPost={currentPost}
          currUser={user.id}
        />
      )}
    </>
  );
};

export default MainScreen;
