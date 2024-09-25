"use client";

import React, { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import CustomFormField, { FormFieldType } from './CustomFormField';
import { postFormSchema } from '@/lib/utils';
import { commentOnPost, likePost, dislikePost } from '@/lib/actions/post.actions';


const PostCard = ({ post, userId }: PostCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [dislikes, setDislikes] = useState(post.dislikes.length);
  const [comments, setComments] = useState(post.comments); // Initialize comments state

  //handle likes
  const handleLike = async () => {
    setIsLoading(true);
    try {
        await likePost({ postId: post.postId, userId });
        setLikes((prev) => prev + 1);
    } catch (error) {
        console.error('Error liking post', error);
    } finally {
        setIsLoading(false);
    }
  }

  //handle dislikes
  const handleDislike = async () => {
    setIsLoading(true);
    try { 
        await dislikePost({ postId: post.postId, userId });
        setDislikes((prev) => prev + 1);
    } catch (error) {
        console.error('Error disliking post', error);
    } finally {
      setIsLoading(false);
    }
  }

  //handle comment form submission
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    setIsLoading(true);
    try {
        await commentOnPost({
          postId: post.postId,
          userId,
          content: data.content,
        });
        setComments([...comments, data.content]); 
        form.reset();
    } catch (error) {
        console.error('Error adding comment', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-4">
        <p className="text-lg font-semibold text-white-1">{post.content}</p>
      </div>

      <div className="flex items-center space-x-4 text-gray-400">
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={handleLike}
          className="cursor-pointer flex items-center space-x-1"
        >
          <AiFillLike className="text-blue-400" size={24} />
          <span>{likes}</span> 
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={handleDislike}
          className="cursor-pointer flex items-center space-x-1"
        >
          <AiFillDislike className="text-red-400" size={24} />
          <span>{dislikes}</span> 
        </motion.div>
        <div className="flex items-center space-x-1">
          <FaCommentAlt className="text-green-400" size={20} />
          <span>{comments.length}</span> 
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-300">Comments</h3>
        {comments.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {comments.map((comment, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg text-sm text-white-2 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                }`}
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 mt-2">No comments yet.</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex items-center">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="content"
            label="Add Comment"
            placeholder="Add a comment"
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-4 mt-6 transition duration-200"
          >
            Comment
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};


export default PostCard;
