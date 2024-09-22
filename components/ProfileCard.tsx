import React from 'react';
import Image from "next/image";


const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src="/icons/avatar.jpeg"
        alt={user.name}
        width={250}
        height={250}
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 md:justify-center">
          <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-white-2">
              Verified Developer
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">{user.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
