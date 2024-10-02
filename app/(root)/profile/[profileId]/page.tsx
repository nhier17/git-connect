"use client";

import React, { useState, useEffect } from 'react';
import LoaderSpinner from '@/components/LoaderSpinner';
import ProfileCard from '@/components/ProfileCard';
import EditProfileForm from '@/components/EditProfileForm';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/lib/actions/user.actions';
import { FaUser, FaEnvelope, FaBook, FaBriefcase, FaGithub } from 'react-icons/fa';

const Profile = ({ params }: { params: { profileId: string } }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [user, setUser] = useState(null);
  

  const userId = params.profileId;

  // Fetch user data 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById({ userId });
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);


  if (!user) return <LoaderSpinner />

  //update profile 
  const handleUpdateProfile = (updatedUSer) => {
    setUser(updatedUSer);
    setIsEditing(false);
  }

  return (
    <section className="py-9 flex flex-col">
      <h1 className="text-2xl font-bold text-white-1 max-md:text-center">GitConnect Profile</h1>
      {!isEditing ? (
        <>
          <ProfileCard user={user} />
          <div className="flex justify-end mt-4">
            <Button 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>
        </>
      ) : (
        <EditProfileForm user={user} onClose={() => setIsEditing(false)} onUpdateProfile={handleUpdateProfile} />
      )}
    
      <div className="flex flex-col gap-6 mt-9">
        <section className="bg-gray-900 px-4 py-8 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <FaUser className="text-3xl text-blue-500" />
            <h2 className="text-2xl font-semibold text-white-1">Personal Details</h2>
          </div>
          <div className="text-white-2 text-lg space-y-2">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><FaEnvelope className="inline mr-2" /> {user.email}</p>
            <p><span className="font-medium">Bio:</span> {user.bio}</p>
          </div>
        </section>

        <section className="bg-gray-900 px-4 py-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <FaBook className="text-3xl text-yellow-400" />
            <h2 className="text-2xl font-semibold text-white-1">Education</h2>
          </div>
          <div className="text-white-2 text-lg space-y-2">
            {user.education.length > 0 ? (
              user.education.map((edu, index) => (
                <p key={index}>{edu}</p>
              ))
            ) : (
              <p className="text-gray-500">No education information available.</p>
            )}
          </div>
        </section>

        <section className="bg-gray-900 px-4 py-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <FaBriefcase className="text-3xl text-green-400" />
            <h2 className="text-2xl font-semibold text-white-1">Work Experience</h2>
          </div>
          <div className="text-white-2 text-lg space-y-2">
            {user.workExperience.length > 0 ? (
              user.workExperience.map((experience, index) => (
                <p key={index}>{experience}</p>
              ))
            ) : (
              <p className="text-gray-500">No work experience information available.</p>
            )}
          </div>
        </section>

        <section className="bg-gray-900 px-4 py-8 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <FaGithub className="text-3xl text-gray-400" />
            <h2 className="text-2xl font-semibold text-white-1">GitHub Repositories</h2>
          </div>
          <div className="text-white-2 text-lg space-y-2">
            {user.githubRepositories.length > 0 ? (
              user.githubRepositories.map((repo, index) => (
                <p key={index}>
                  <a href={repo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline transition duration-200">
                    {repo}
                  </a>
                </p>
              ))
            ) : (
              <p className="text-gray-500">No GitHub repositories available.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Profile;
