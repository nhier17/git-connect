"use client"

import React, { useState, useEffect } from 'react'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import CustomFormField, { FormFieldType } from './CustomFormField';
import { postFormSchema } from '@/lib/utils';
import { commentOnPost, getComments } from '@/lib/actions/post.actions';

const CommentsForm = ({ post, userId, setComments, comments}: PostCardProps) => { 
    const[isLoading, setIsLoading] = useState(false);

    const postId = post.postId
    
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const fetchedComments = await getComments(postId);
            setComments(fetchedComments || []);
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
    
        fetchComments();
      }, [postId]);

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
       const comment = await commentOnPost({
          postId,
          userId,
          content: data.content,
        });
        if (comment){
            const updatedComments = await getComments(postId);
            setComments(updatedComments || []);
            form.reset();
        }
    } catch (error) {
        console.error('Error adding comment', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
     <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-300">Comments</h3>
        {comments.length > 0 ? (
  <ul className="mt-2 space-y-2">
    {comments.map((comment, index) => (
      <li
        key={comment.commentId} 
        className={`p-2 rounded-lg text-sm text-white-2 ${
          index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
        }`}
      >
        {comment.content}
      </li>
    ))}
  </ul>
) : (
  <p className="text-sm text-gray-400 mt-2">No comments yet.</p>
)}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex items-center space-x-4">
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
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Comment'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CommentsForm