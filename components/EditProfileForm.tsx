"use client";

import React, { useState } from 'react';
import { updateUserProfile } from '@/lib/actions/user.actions';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import CustomFormField, { FormFieldType } from './CustomFormField';
import { authFormSchema } from '@/lib/utils';

const EditProfileForm = ({ user, onClose, onUpdateProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema('edit-profile');

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      bio: user.bio,
      education: user.education.join(', '), 
      workExperience: user.workExperience.join(', '),
      githubRepositories: user.githubRepositories.join(', '),
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userData = {
        name: data.name!,
        email: data.email,
        password: data.password,
        bio: data.bio!,
        education: data.education?.split(',').map(item => item.trim()) || [],
        workExperience: data.workExperience?.split(',').map(item => item.trim()) || [],
        githubRepositories: data.githubRepositories?.split(',').map(item => item.trim()) || [],
      };
      const updatedUser = await updateUserProfile(user.$id, userData);
      if(updatedUser) {
        onUpdateProfile(updatedUser);
        onClose();
      }
    } catch (error) {
      console.error('Error updating profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Name"
        placeholder="Enter your name"
         iconSrc="/icons/user.svg"
        iconAlt="user"
      />
      <CustomFormField
      fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself"
      />
      <CustomFormField
       fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name="education"
        label="Education"
        placeholder="Enter education details, separated by commas"
      />
      <CustomFormField
        fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name="workExperience"
        label="Work Experience"
        placeholder="Enter work experience details, separated by commas"
      />
      <CustomFormField
        fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name="githubRepositories"
        label="GitHub Repositories"
        placeholder="Enter GitHub repositories, separated by commas"
      />
     <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 mt-2">
      Save Changes
    </Button>
      </form>
    </Form>
    </section>
  );
};

export default EditProfileForm;
