import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Post from './Post';
import { getPosts } from '../utils/apis';
import PostPage from './PostPage';

const MainScreen = ({
  setShowCreatePost,
  showCreatePost,
  authState,
  user,
  posts,
  setPosts,
  setShowPost,
  showPost,
}) => {
  const callback = ({ type, data }) => {
    if (type === 'success' && data.length > 0) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts(callback);
  }, []);

  const [currentPost, setCurrentPost] = useState({});

  return (
    <>
      <Navbar
        setShowCreatePost={setShowCreatePost}
        showCreatePost={showCreatePost}
        authState={authState}
        user={user}
        setShowPost={setShowPost}
        showPost={showPost}
      />
      {!showPost ? (
        <div className="flex flex-col justify-center items-center  mx-5 relative">
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
        <PostPage currentPost={currentPost} currUser={user.id} />
      )}
    </>
  );
};

export default MainScreen;
