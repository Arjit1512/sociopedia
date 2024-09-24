import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { API_BASE_URL } from '../../Config.js';

const PostsWidget = ({userId,isProfile = false}) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);


  const getPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/posts`, //*nuvvu server->routes->posts.js lo ee URL aythe pedtavo ade URL vaadali
    { 
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${API_BASE_URL}/posts/${userId}/posts`, //*nuvvu server->routes->posts.js lo ee URL aythe pedtavo ade URL vaadali
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }  // useEffect lo [] enduk vadtar antey -> so that the useEffect will be called only once.
        //EE KINDA AA eslint... SODI ENDUK PETTANU ANTEY -> to get rid of some annoying error.
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        {posts.map(
            ({_id,userId,firstName,lastName,description,location,picturePath,userPicturePath,likes,comments}) => (
                <PostWidget 
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                />
            )
        )}
    </>
  );

};

export default PostsWidget;