import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Post from './Post';
import { getPosts } from '../utils/apis';

const MainScreen = ({ setShowCreatePost, showCreatePost, authState, user }) => {
  const [posts, setPosts] = useState([]);

  const callback = ({ type, data }) => {
    if (type === 'success' && data.length > 0) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts(callback);
  }, []);
  console.log(posts);
  return (
    <>
      <Navbar
        setShowCreatePost={setShowCreatePost}
        showCreatePost={showCreatePost}
        authState={authState}
        user={user}
      />
      <div className="flex flex-col justify-center items-center  mx-5">
        <div className="py-10 space-y-3 md:w-[500px] text-center">
          <h1 className="text-5xl font-bold">The Blog</h1>
          <p className="text-lg text-gray-600">
            <q>
              Be who you are and say what you feel, because those who mind don't
              matter, and those who matter don't mind.
            </q>
          </p>
        </div>
        {posts.length > 0 ? (
          <div className="md:columns-2 md:gap-5 gap-0 columns-1">
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
        ) : (
          <p className="text-2xl text-gray-500">
            🤔 No posts yet. Create one by clicking on the button below.
          </p>
        )}
      </div>
    </>
  );
};

export default MainScreen;
