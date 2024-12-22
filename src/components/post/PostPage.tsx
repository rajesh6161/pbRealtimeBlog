import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../features/post/postSlice';
import { likePost } from '../../utils/apis';
import Modal from '../Modal';
import EditPost from './EditPost';
import { Post } from '../../App';
import { AppDispatch, RootState } from '../../store';

interface PostPageProps {
  currentPost: Post;
  currUser: string;
  setShowPost: (show: boolean) => void;
}

interface PostLikes {
  users: string[];
}

interface PostWithLikes extends Post {
  likes?: PostLikes;
}

const PostPage: React.FC<PostPageProps> = ({ currentPost, currUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [postData, setPostData] = useState<PostWithLikes>(currentPost);
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(postData?.likes?.users.length || 0);

  const handleLikes = () => {
    if (postData.likes?.users.includes(currUser)) {
      return;
    } else {
      let l = Array.from(postData.likes?.users || []);
      l.push(currUser);
      likePost(postData.id, { likes: { users: l } });
      setAlreadyLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  useEffect(() => {
    if (postData.likes?.users.includes(currUser)) {
      setAlreadyLiked(true);
    }
  }, []);

  const [showModal, setShowModal] = useState<boolean>(false);

  const { updatedPost, loading } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (updatedPost.id === postData.id) {
      setPostData(updatedPost as PostWithLikes);
    }
  }, [loading]);

  return (
    <div className="relative">
      <div className="absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/3">
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <EditPost currentPost={currentPost} />
        </Modal>
      </div>

      <div className="md:h-96 h-64 bg-red-400 overflow-hidden">
        <img
          src={postData.imgurl}
          alt="img"
          className="w-full md:h-96 object-cover grayscale hover:grayscale-0 duration-150 hover:scale-150 cursor-pointer"
        />
      </div>
      <div className="flex justify-center absolute top-[66%] left-1/2 -translate-x-1/2 shadow-md md:max-w-4xl w-full bg-white">
        <div className="space-y-3 md:pr-12 md:py-5 md:px-8 p-4 w-full">
          <p className="uppercase text-gray-500 flex md:flex-row flex-col md:justify-between md:items-center">
            {moment(postData.updated).format('MMMM Do YYYY')}
            <span className="text-xs text-gray-500 lowercase">
              {postData.user === currUser ? (
                <span className="space-x-3">
                  <i
                    onClick={() => setShowModal(true)}
                    className="fa-solid fa-pen-to-square text-lg hover:text-gray-900 cursor-pointer"
                  ></i>
                  <i
                    onClick={() => {
                      dispatch(deletePost(postData.id));
                    }}
                    className="fa-solid fa-trash text-lg hover:text-gray-900 cursor-pointer"
                  ></i>
                </span>
              ) : (
                `posted by ${postData.user}`
              )}
            </span>
          </p>
          <h1 className="md:text-3xl text-2xl font-semibold">
            {postData.title}
          </h1>
          <p className="md:text-lg text-sm">{postData.content}</p>
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
