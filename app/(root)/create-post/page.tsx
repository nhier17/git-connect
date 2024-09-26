export const dynamic = 'force-dynamic';

import React from 'react';
import CreatePostForm from '@/components/CreatePostForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from "next/navigation";

const CreatePost = async () => {
  const user = await getLoggedInUser();
  
  if(!user) redirect('/sign-in')

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-20 font-semibold text-white-1 mb-4">
        New post
      </h2>
      <div className="">
        <CreatePostForm userId={user?.userId} />
      </div>
    </div>
  );
};

export default CreatePost;
