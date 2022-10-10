import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Post = ({ post }) => {
  const { title, content, imgurl, user, updated } = post;

  const sampleImg =
    'https://images.freeimages.com/images/large-previews/bee/omniety-1535599.jpg';
  return (
    <div className="md:max-w-[700px] max-w-sm pb-5 px-5 md:px-0">
      {imgurl?.length > 0 ? (
        <div className="md:w-[600px] overflow-hidden">
          <img
            src={imgurl}
            alt="blog image"
            className="w-full h-64 object-cover grayscale hover:grayscale-0 duration-150 delay-150 hover:scale-150 cursor-pointer"
          />
        </div>
      ) : (
        <div className="md:w-[600px] overflow-hidden">
          <img
            src={sampleImg}
            alt="sample image"
            className="w-full h-64 object-cover grayscale hover:grayscale-0 duration-150 delay-150 hover:scale-150 cursor-pointer"
          />
        </div>
      )}
      <div className="md:py-5 md:px-8 p-3 bg-gray-100">
        <div className="md:w-[500px] space-y-3">
          <p>{moment(updated).format('MMMM Do YYYY')}</p>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="max-h-[50px] truncate">{content}</div>
          <div className="flex items-center justify-between py-3">
            <p className="uppercase font-semibold flex items-center">
              Read Article{' '}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </p>
            <span className="text-xs text-gray-500">posted by {user}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
