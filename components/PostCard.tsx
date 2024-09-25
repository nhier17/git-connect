"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import CustomFormField, { FormFieldType } from './CustomFormField';
import CommentsForm from './CommentsForm';
import { postFormSchema } from '@/lib/utils';
import { likePost, dislikePost, deletePost } from '@/lib/actions/post.actions';


const PostCard = ({ post, userId }: PostCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [dislikes, setDislikes] = useState(post.dislikes.length);
  const [comments, setComments] = useState([]);

  //handle likes
  const handleLike = async () => {
    try {
        await likePost({ postId: post.postId, userId });
        setLikes((prev) => prev + 1);
    } catch (error) {
        console.error('Error liking post', error);
    }
  }

  //handle dislikes
  const handleDislike = async () => {
    try { 
        await dislikePost({ postId: post.postId, userId });
        setDislikes((prev) => prev + 1);
    } catch (error) {
        console.error('Error disliking post', error);
    } 
  }

  //handle delete post
  const handleDeletePost = async () => {
    try {
        await deletePost(post.postId);
        router.refresh();
    } catch (error) {
        console.error('Error deleting post', error);
    } 
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-4">
        <p className="text-lg font-semibold text-white-1">{post.content}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between text-gray-400">
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={handleLike}
          className="cursor-pointer flex items-center space-x-1"
        >
          <AiFillLike className={`text-blue-500 ${isLoading ? 'animate-pulse' : ''}`} size={24} />
          <span>{likes}</span> 
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={handleDislike}
          className="cursor-pointer flex items-center space-x-1"
        >
          <AiFillDislike className={`text-red-500 ${isLoading ? 'animate-pulse' : ''}`} size={24} />
          <span>{dislikes}</span> 
        </motion.div>
        <div className="flex items-center space-x-1">
          <FaCommentAlt className="text-green-400" size={20} />
          <span>{comments.length}</span> 
        </div>
      </div>
      </div>
      
      <CommentsForm post={post} userId={userId} comments={comments} setComments={setComments} />

      {userId === post.userId && (
        <div className="mt-4">
          <Button
            onClick={handleDeletePost}
            className="bg-red-700 hover:text-red-500 px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Post'}
          </Button>
        </div>
      )}
    </motion.div>
  );
};


export default PostCard;
