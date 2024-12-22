import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../../features/post/postSlice';
import Spinner from '../Spinner';
import { Post } from '../../App';
import { AppDispatch, RootState } from '../../store';

interface EditPostProps {
  currentPost: Post;
}

interface PostState {
  title: string;
  imgurl?: string;
  content: string;
}

const EditPost: React.FC<EditPostProps> = ({ currentPost }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [postState, setPostState] = useState<PostState>({
    title: currentPost.title,
    imgurl: currentPost.imgurl,
    content: currentPost.content,
  });

  const { loading } = useSelector((state: RootState) => state.post);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pb-14 space-y-3 w-[700px] px-10">
        <h1 className="text-3xl font-bold text-center">Edit Post</h1>
        <div className="space-y-1">
          <p className="text-lg">Post Title</p>
          <input
            className="w-full"
            type="text"
            value={postState.title}
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
            value={postState.imgurl}
            onChange={(e) =>
              setPostState({ ...postState, imgurl: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Content</p>
          <textarea
            className="w-full"
            value={postState.content}
            placeholder="Write Here..."
            rows={5}
            onChange={(e) =>
              setPostState({ ...postState, content: e.target.value })
            }
          />
        </div>
        <button
          className="bg-gray-700 w-full p-2 text-white hover:bg-slate-900"
          onClick={() => {
            dispatch(editPost({ ...postState, post_id: currentPost.id }));
          }}
        >
          {loading ? <Spinner /> : 'Edit Post'}
        </button>
      </div>
    </div>
  );
};

export default EditPost;
