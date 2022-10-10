import React from 'react';
import { logout } from '../utils/apis';

const Navbar = ({ setShowCreatePost, showCreatePost, authState, user }) => {
  return (
    <div
      className="
        flex
        items-center
        bg-[#7E3F1B]
        shadow-md
        py-5
        px-8
        text-white"
    >
      <div className="flex items-center space-x-5">
        {showCreatePost ? (
          <button
            className="bg-gray-900 w-7 h-7 rounded-full flex items-center justify-center"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <i className="fa-solid fa-house"></i>
          </button>
        ) : (
          <button
            className="bg-gray-900 w-7 h-7 rounded-full flex items-center justify-center"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
        <h1 className="tracking-[8px] text-2xl font-semibold">IMPULSE</h1>
        {authState && <span className="text-sm ml-2">{user.email}</span>}
        <button className="text-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
