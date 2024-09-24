"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from './CustomFormField';
import { postFormSchema } from '@/lib/utils';
import { createPost } from '@/lib/actions/post.actions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CreatePostForm = ({ userId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    setIsLoading(true);
    try {
      const postData = {
        content: data.content,
        likes: [],
        dislikes: [],
        comments: [],
      };
      const newPost = await createPost({userId, postData});
      if (newPost) {
        router.push('/post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex  w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex items-center gap-1">
        <Image
          src="/icons/logo1.svg"
          width={34}
          height={34}
          alt="git logo"
          className="mb-2"
        />
        <h1 className="text-26 font-ibm-plex-serif font-bold text-white-1">
          GitConnect
        </h1>
        </div>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="content"
            label="Create a post"
            placeholder="What's on your mind..."
          />

          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePostForm;
