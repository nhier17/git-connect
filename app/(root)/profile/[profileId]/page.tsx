import React from 'react';
import { getLoggedInUser } from "@/lib/actions/user.actions";
import LoaderSpinner from '@/components/loaderSpinner';
import ProfileCard from '@/components/ProfileCard'; 

const Profile = async  ({ params }: { params: { profileId: string }}) => {
  const user = await getLoggedInUser(); 

  if (!user) return <LoaderSpinner />; 

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white max-md:text-center">GitConnect Profile</h1>

      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row text-gray-200">
        {/* ProfileCard Component */}
        <ProfileCard user={user} />

        {/* Personal Details, Education, etc. */}
        <section className="profile-section">
          <h2>Personal Details</h2>\
          <div>
            {/* personal details */}
          </div>
        </section>

        <section className="profile-section">
          <h2>Education</h2>
          <div>
            {/*education */}
          </div>
        </section>

        <section className="profile-section">
          <h2>Work Experience</h2>
          <div>
            {/* work experience */}
          </div>
        </section>

        <section className="profile-section">
          <h2>GitHub Repositories</h2>
          <div>
            {/* GitHub repositories */}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Profile;
