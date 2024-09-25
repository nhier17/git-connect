import React from 'react';
import { getPosts } from '@/lib/actions/post.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import PostCard from '@/components/PostCard';
import LoaderSpinner from '@/components/LoaderSpinner';

const Post = async () => {
  const posts = await getPosts();
  const user = await getLoggedInUser();

if(!posts) return <LoaderSpinner />

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-white-1 mb-4">Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.postId}
            post={post}
            userId={user.userId}
          />
        ))
      ) : (
        <p className="text-white">No posts yet. Be the first to post!</p>
      )}
    </div>
  );
};

export default Post;
