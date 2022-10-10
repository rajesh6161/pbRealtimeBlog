import React from 'react';
import { logout } from '../utils/apis';

const Navbar = ({
  setShowCreatePost,
  showCreatePost,
  authState,
  user,
  setShowPost,
  showPost,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 shadow-md py-5 md:px-8 px-3 text-white">
      <div className="flex items-center space-x-5">
        {showCreatePost ? (
          <button
            className=" flex items-center justify-center"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <i className="fa-solid fa-house"></i>
          </button>
        ) : !showPost ? (
          <button
            className=" rounded-full flex items-center justify-center"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <i
            className="fa-solid fa-arrow-left-long cursor-pointer"
            onClick={() => setShowPost(false)}
          ></i>
        )}
        <h1 className="tracking-[8px] text-2xl font-semibold">IMPULSE</h1>
        {authState && (
          <span className="text-sm ml-2 hidden md:block">
            <i className="fa-solid fa-user mx-2"></i>
            {user.email}
          </span>
        )}
        <button className="text-sm" onClick={logout}>
          <i className="fa-solid fa-right-to-bracket mx-2"></i>logout
        </button>
      </div>
      <div className="md:flex items-center space-x-5 hidden">
        <i className="fa-brands fa-github"></i>
        <a
          target="_blank"
          href="https://pocketbase.io/"
          className="flex items-center text-xs focus:outline-none"
        >
          powered by{' '}
          <img
            className="w-8 h-8  animate-pulse"
            src="https://pocketbase.io/images/logo.svg"
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
