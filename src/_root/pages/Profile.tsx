// ... (import statements)

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById, useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Link, useParams } from "react-router-dom";


const Profile = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts();
  const { id } = useParams();
  const { data: userPost, isPending: isUserPostLoading } = useGetPostById(id || '');
  const { user } = useUserContext();

  const { data: allPosts, isPending: isAllPostsLoading, isError: isErrorAllPosts } = useGetRecentPosts();

  const handleDeletePost = () => {
    // Add your logic for deleting the post
  };

  // Filter posts to show only the current user's posts
  const userPosts = allPosts?.documents.filter(post => post.creatorId === user.id);

  return (
    <div className="profile-container">
      {isUserPostLoading || isAllPostsLoading ? (
        <Loader />
      ) : (
        <div className="profile-inner-container flex flex-col w-full max-w-5xl mt-16 mb-7">
        <Link to={`/profile/${user.id}`}
          className='flex gap-3 items-center'>
          <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
            alt="profile" 
            className='h-14 w-14 rounded-full'/>
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-dark-3'>
              @{user.username}
            </p>
            <div className="profile-stats flex items-center gap-10 mt-3">
              <span>{user.postsCount || 0} posts</span>
              <span>{user.followersCount || 0} followers </span>
              <span>{user.followingCount || 0} following</span>
            </div>
          </div>
        </Link>
          
        <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
          <h3 className='body-bold md:h3-bold'>Your Posts</h3>
        </div>
        {isPostLoading && !posts ? (
         <Loader />
          ) : (
            <ul className="flex flex-1 gap-9 w-full">
              {posts?.documents
                .filter((post: Models.Document) => {
                  console.log('Post creator ID:', post.creator.$id); // Update this to the correct property
                  console.log('User ID:', user.id);
                  return post.creator.$id === user.id; // Update this to the correct property
                }) // Filter posts by the current user
                .map((post: Models.Document) => (
                  <PostCard post={post} key={post.caption}/>
                ))}
            </ul>
          )}



        <div className="home-posts">
          {isAllPostsLoading && !allPosts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {userPosts?.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>

        {/* ... (remaining profile content) */}
      </div>
    )}
  </div>
  );
};

export default Profile;
