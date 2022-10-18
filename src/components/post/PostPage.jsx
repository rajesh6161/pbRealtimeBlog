import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { likePost } from '../../utils/apis';
import Modal from '../Modal';

const PostPage = ({ currentPost, currUser }) => {
  const { id, title, content, imgurl, user, updated, likes } = currentPost;
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.users.length);
  const handleLikes = () => {
    if (likes?.users.includes(currUser)) {
      return;
    } else {
      let l = Array.from(likes.users);
      l.push(currUser);
      likePost(id, { likes: { users: l } });
      setAlreadyLiked(true);
      setLikeCount(likeCount + 1);
    }
  };
  useEffect(() => {
    if (likes?.users.includes(currUser)) {
      setAlreadyLiked(true);
    }
  }, []);
  return (
    <div className="relative">
      <div className="absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/3">
        <Modal />
      </div>

      <div className="md:h-96 h-64 bg-red-400 overflow-hidden">
        <img
          src={imgurl}
          alt="post image"
          className="w-full md:h-96 object-cover grayscale hover:grayscale-0 duration-150 hover:scale-150 cursor-pointer"
        />
      </div>
      <div className="flex justify-center absolute top-[66%] left-1/2 -translate-x-1/2 shadow-md md:max-w-4xl w-full bg-white">
        <div className="space-y-3 md:pr-12 md:py-5 md:px-8 p-4 w-full">
          <p className="uppercase text-gray-500 flex md:flex-row flex-col md:justify-between md:items-center">
            {moment(updated).format('MMMM Do YYYY')}
            <span className="text-xs text-gray-500 lowercase">
              {user === currUser ? (
                <i
                  onClick={() => alert('edit post')}
                  className="fa-solid fa-pen-to-square text-lg hover:text-gray-900 cursor-pointer"
                ></i>
              ) : (
                `posted by ${user}`
              )}
            </span>
          </p>
          <h1 className="md:text-3xl text-2xl font-semibold">{title}</h1>
          <p className="md:text-lg text-sm">{content}</p>
          <div className="py-1 flex items-center">
            <i
              onClick={handleLikes}
              className={`fa-${
                alreadyLiked ? 'solid' : 'regular'
              } fa-heart cursor-pointer text-red-500`}
            ></i>

            <span className="ml-2">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
