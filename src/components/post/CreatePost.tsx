import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/post/postSlice';
import Navbar from '../Navbar';
import Spinner from '../Spinner';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../features/auth/authService';

interface CreatePostProps {
  setShowCreatePost: (show: boolean) => void;
  showCreatePost: boolean;
  user: User;
  loggedIn: boolean;
}

interface PostState {
  title: string;
  content: string;
  imgurl: string;
}

interface CreatePostData extends PostState {
  user: string;
  likes?: {
    users: string[];
  };
}

const CreatePost: React.FC<CreatePostProps> = ({ 
  setShowCreatePost, 
  showCreatePost, 
  user,
  loggedIn 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [postState, setPostState] = useState<PostState>({
    title: '',
    content: '',
    imgurl: '',
  });

  const defaultImg =
    'https://images.freeimages.com/images/large-previews/bee/omniety-1535599.jpg';

  const { loading } = useSelector((state: RootState) => state.post);

  const handleCreatePost = () => {
    const postData: CreatePostData = {
      ...postState,
      imgurl: postState.imgurl || defaultImg,
      user: user.id,
      /*likes: {
        users: [],
      },*/
    };
    dispatch(createPost(postData));
  };

  return (
    <>
      <Navbar
        setShowCreatePost={setShowCreatePost}
        showCreatePost={showCreatePost}
        user={user}
        loggedIn={loggedIn}
        setShowPost={() => {}}
        showPost={false}
      />
      <div className="flex flex-col justify-center items-center mx-5 py-10">
        <div className="pb-14 space-y-3 w-[700px] p-10">
          <h1 className="text-3xl font-bold text-center">Create Post</h1>
          <div className="space-y-1">
            <p className="text-lg">Post Title</p>
            <input
              className="w-full"
              type="text"
              placeholder="Title for your post..."
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <p className="text-lg">Background Image (optional)</p>
            <input
              className="w-full"
              type="text"
              placeholder="Image Url..."
              onChange={(e) =>
                setPostState({ ...postState, imgurl: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <p className="text-lg">Content</p>
            <textarea
              className="w-full"
              placeholder="Write Here..."
              rows={5}
              onChange={(e) =>
                setPostState({ ...postState, content: e.target.value })
              }
            />
          </div>
          <button
            className="bg-gray-700 w-full p-2 text-white hover:bg-slate-900"
            onClick={handleCreatePost}
          >
            {loading ? <Spinner /> : 'Create Post'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
