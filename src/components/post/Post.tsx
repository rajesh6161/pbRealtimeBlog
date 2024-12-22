import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
//import { RecordModel } from 'pocketbase';
import { Post as PostType } from '../../App';

interface PostProps {
  post: PostType;
  setShowPost: (show: boolean) => void;
  setCurrentPost: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, setShowPost, setCurrentPost }) => {
  const { title, content, imgurl, user, updated } = post;

  const useCurrentPost = () => {
    setCurrentPost(post);
    setShowPost(true);
  };

  const { user: currUser } = useSelector((state: RootState) => state.auth);

  return (
    <div className="md:max-w-[700px] max-w-sm pb-5 px-5 md:px-0">
      {imgurl && imgurl.length > 0 && (
        <div className="md:w-[600px] overflow-hidden">
          <img
            src={imgurl}
            alt="blog image"
            className="w-full h-64 object-cover grayscale hover:grayscale-0 duration-150 hover:scale-150 cursor-pointer"
            onClick={useCurrentPost}
          />
        </div>
      )}
      <div className="md:py-5 md:px-8 p-3 bg-gray-100">
        <div className="md:w-[500px] space-y-3">
          <p>{moment(updated).format('MMMM Do YYYY')}</p>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="max-h-[50px] truncate">{content}</div>
          <div className="flex items-center justify-between py-3">
            <p
              className="uppercase font-semibold flex items-center cursor-pointer"
              onClick={useCurrentPost}
            >
              Read Article{' '}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </p>
            <span className="text-xs text-gray-500">posted by {user}</span>
          </div>
        </div>
      </div>
      {currUser?.id === user && <div className="bg-gray-800 w-full h-1"></div>}
    </div>
  );
};

export default Post;
